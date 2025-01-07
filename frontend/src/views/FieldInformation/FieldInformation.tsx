/**
 * @summary The Field Information page for the application
 */
import { useState, useEffect } from 'react';
import FieldList from './FieldList/FieldList';
import { CardHeader, Banner, ButtonWrapper, InfoBox } from './fieldInformation.styles';
import { Card, Dropdown, Button } from '../../components/common';
import { TabOptions, TabContentDisplay } from '../../components/common/Tabs/Tabs';
import useAppService from '@/services/app/useAppService';
import NMPFile from '@/types/NMPFile';
import defaultNMPFile from '@/constants/DefaultNMPFile';

export default function FieldInformation() {
  const { state, setNMPFile } = useAppService();
  const [activeTab, setActiveTab] = useState(0);
  const [fields, setFields] = useState<
    {
      FieldName: string;
      Area: string;
      PreviousYearManureApplicationFrequency: string;
      Comment: string;
    }[]
  >([]);
  const [soilTestData, setSoilTestData] = useState({
    SoilTest: '',
    ConvertedKelownaK: '2',
    ConvertedKelownaP: '4',
    ValP: '',
    sampleDate: '',
    valK: '',
    valNO3H: '',
    valPH: '',
  });

  useEffect(() => {
    if (state.nmpFile) {
      const data = state.nmpFile;
      if (data) {
        const parsedData = JSON.parse(data);
        setFields(parsedData.years[0].Fields);
      }
    }
  }, [state.nmpFile]);

  const soilTestOptions = [
    { value: 1, label: 'No Soil Test from within the past 3 years' },
    { value: 2, label: 'Other Lab (Bicarbonate and Amm Acetate' },
  ];

  const handleSoilTestChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setSoilTestData({ ...soilTestData, [name]: value });
  };

  const tabs = [
    {
      id: 'field-list',
      label: 'Field List',
      content: (
        <FieldList
          fields={fields}
          setFields={setFields}
        />
      ),
    },
    {
      id: 'soil-test',
      label: 'Soil Tests',
      content: (
        <div>
          <InfoBox>Do you have soil test from within the past 3 years?</InfoBox>
          <Dropdown
            label="Lab (Soil Test Method)"
            name="SoilTest"
            value={soilTestData.SoilTest}
            options={soilTestOptions}
            onChange={handleSoilTestChange}
          />
        </div>
      ),
    },
    { id: 'tab-3', label: 'Tab 3', content: <div>Tab 3 Content</div> },
  ];

  const handleNext = () => {
    let nmpFile: NMPFile;

    if (state.nmpFile) nmpFile = JSON.parse(state.nmpFile);
    else nmpFile = defaultNMPFile;

    if (nmpFile.years && nmpFile.years.length > 0) {
      nmpFile.years[0].Fields = fields.map((field) => ({
        FieldName: field.FieldName,
        Area: parseFloat(field.Area),
        PreviousYearManureApplicationFrequency: field.PreviousYearManureApplicationFrequency,
        Comment: field.Comment,
      }));
    }

    setNMPFile(JSON.stringify(nmpFile));
    if (activeTab <= tabs.length) setActiveTab(activeTab + 1);
  };

  return (
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
  );
}
