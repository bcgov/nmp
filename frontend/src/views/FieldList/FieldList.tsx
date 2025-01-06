/**
 * @summary The Field List page for the application
 */
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { CardHeader, Banner, ListItemContainer, ButtonWrapper } from './fieldList.styles';
import { Card, InputField, Dropdown, Button } from '../../components/common';
import { TabOptions, TabContentDisplay } from '../../components/common/Tabs/Tabs';
import Modal from '../../components/common/Modal/Modal';
// import useAppService from '@/services/app/useAppService';
// import NMPFile from '@/types/NMPFile';
// import defaultNMPFile from '@/constants/DefaultNMPFile';

export default function FieldList() {
  // const { state, setNMPFile } = useAppService();
  // const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [isFieldModalVisible, setIsFieldModalVisible] = useState(false);
  const [fields, setFields] = useState<
    { fieldName: string; area: string; manure: string; comment: string }[]
  >([]);
  const [formData, setFormData] = useState({
    fieldName: '',
    area: '',
    manure: '',
    comment: '',
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const manureOptions = [
    { value: 1, label: 'Manure 1' },
    { value: 2, label: 'Manure 2' },
  ];

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (editIndex !== null) {
      const updatedFields = fields.map((field, index) => (index === editIndex ? formData : field));
      setFields(updatedFields);
      setEditIndex(null);
    } else {
      setFields([...fields, formData]);
    }
    setFormData({
      fieldName: '',
      area: '',
      manure: '',
      comment: '',
    });
    setIsFieldModalVisible(false);
  };

  const handleEdit = (index: number) => {
    setFormData(fields[index]);
    setEditIndex(index);
    setIsFieldModalVisible(true);
  };

  const handleDelete = (index: number) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const tabs = [
    {
      id: 'field-list',
      label: 'Field List',
      content: (
        <div>
          {fields.map((field, index) => (
            <ListItemContainer key={field.fieldName}>
              <h3>{field.fieldName}</h3>
              <p>Area: {field.area}</p>
              <p>Manure: {field.manure}</p>
              <p>Comment: {field.comment}</p>
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
        </div>
      ),
    },
    { id: 'tab-2', label: 'Tab 2', content: <div>Tab 2 Content</div> },
    { id: 'tab-3', label: 'Tab 3', content: <div>Tab 3 Content</div> },
  ];

  const handleNext = () => {
    // let nmpFile: NMPFile;
    // if (state.nmpFile) nmpFile = JSON.parse(state.nmpFile);
    // else nmpFile = defaultNMPFile;
    // nmpFile.farmDetails = { ...nmpFile.farmDetails, ...formData };
    // setNMPFile(JSON.stringify(nmpFile));
    // navigate('/field-list');
  };

  return (
    <>
      <Card
        height="500px"
        width="700px"
      >
        <CardHeader>
          <Banner>
            <TabOptions
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </Banner>
        </CardHeader>
        <TabContentDisplay
          tabs={tabs}
          activeTab={activeTab}
        />
        <ButtonWrapper>
          <Button
            text="Next"
            size="sm"
            handleClick={() => {
              handleNext();
            }}
            aria-label="Next"
            variant="primary"
            disabled={false}
          />
        </ButtonWrapper>
      </Card>
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
          name="fieldName"
          value={formData.fieldName}
          onChange={handleChange}
        />
        <InputField
          label="Area"
          type="text"
          name="area"
          value={formData.area}
          onChange={handleChange}
        />
        <Dropdown
          label="Manure"
          name="manure"
          value={formData.manure}
          options={manureOptions}
          onChange={handleChange}
        />
        <InputField
          label="Comment"
          type="text"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
        />
      </Modal>
    </>
  );
}
