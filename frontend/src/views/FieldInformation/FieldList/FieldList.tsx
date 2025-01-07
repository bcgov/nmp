/**
 * @summary This Field list Tab
 */
import { useState, useEffect } from 'react';
import { Dropdown, InputField } from '../../../components/common';
import Modal from '@/components/common/Modal/Modal';
import { ListItemContainer } from './fieldList.styles';
import useAppService from '@/services/app/useAppService';

interface Field {
  FieldName: string;
  Area: string;
  PreviousYearManureApplicationFrequency: string;
  Comment: string;
}

interface FieldListProps {
  fields: Field[];
  setFields: (fields: Field[]) => void;
}

export default function FieldList({ fields, setFields }: FieldListProps) {
  const { state } = useAppService();

  const [isFieldModalVisible, setIsFieldModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [fieldformData, setFieldFormData] = useState({
    FieldName: '',
    Area: '',
    PreviousYearManureApplicationFrequency: '',
    Comment: '',
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFieldFormData({ ...fieldformData, [name]: value });
  };

  const handleEdit = (index: number) => {
    setFieldFormData(fields[index]);
    setEditIndex(index);
    setIsFieldModalVisible(true);
  };

  const handleDelete = (index: number) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const handleSubmit = () => {
    if (editIndex !== null) {
      const updatedFields = fields.map((field, index) =>
        index === editIndex ? fieldformData : field,
      );
      setFields(updatedFields);
      setEditIndex(null);
    } else {
      setFields([...fields, fieldformData]);
    }
    setFieldFormData({
      FieldName: '',
      Area: '',
      PreviousYearManureApplicationFrequency: '',
      Comment: '',
    });
    setIsFieldModalVisible(false);
  };

  const manureOptions = [
    { value: 1, label: 'Manure 1' },
    { value: 2, label: 'Manure 2' },
  ];

  useEffect(() => {
    if (state.nmpFile) {
      const data = state.nmpFile;
      if (data) {
        const parsedData = JSON.parse(data);
        setFields(parsedData.years[0].Fields);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {fields.map((field, index) => (
        <ListItemContainer key={field.FieldName}>
          <h3>{field.FieldName}</h3>
          <p>Area: {field.Area}</p>
          <p>Manure: {field.PreviousYearManureApplicationFrequency}</p>
          <p>Comment: {field.Comment}</p>
          <button
            type="button"
            onClick={() => handleEdit(index)}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => handleDelete(index)}
          >
            Delete
          </button>
        </ListItemContainer>
      ))}
      <button
        type="button"
        onClick={() => setIsFieldModalVisible(true)}
      >
        Add Field
      </button>
      <Modal
        isVisible={isFieldModalVisible}
        title={editIndex !== null ? 'Edit Field' : 'Add Field'}
        onClose={() => setIsFieldModalVisible(false)}
        footer={
          <button
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        }
      >
        <InputField
          label="Field Name"
          type="text"
          name="FieldName"
          value={fieldformData.FieldName}
          onChange={handleChange}
        />
        <InputField
          label="Area"
          type="text"
          name="Area"
          value={fieldformData.Area.toString()}
          onChange={handleChange}
        />
        <Dropdown
          label="Manure"
          name="PreviousYearManureApplicationFrequency"
          value={fieldformData.PreviousYearManureApplicationFrequency}
          options={manureOptions}
          onChange={handleChange}
        />
        <InputField
          label="Comment"
          type="text"
          name="Comment"
          value={fieldformData.Comment}
          onChange={handleChange}
        />
      </Modal>
    </div>
  );
}
