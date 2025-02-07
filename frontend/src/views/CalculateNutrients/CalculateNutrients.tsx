/**
 * @summary The calculate nutrients page for the application
 */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppService from '@/services/app/useAppService';
import {
  CardHeader,
  Banner,
  Heading,
  ButtonWrapper,
} from './CalculateNutrients.styles';
import { TabOptions, TabContentDisplay } from '../../components/common/Tabs/Tabs';
import { Card, Button } from '../../components/common';
import FieldTable from './FieldTable/FieldTable';

export default function CalculateNutrients() {
  const { state } = useAppService();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [fields, setFields] = useState<
    {
      FieldName: string;
      Id: number;
      Area: string;
      PreviousYearManureApplicationFrequency: string;
      Comment: string;
      SoilTest: object;
      Crops: any[];
    }[]
  >([]);

  // for each field create a tab with the field name and populate with its crops
  // extra blank tab being created
  const tabs = fields
    ? fields.map((field) => ({
        id: field.Id.toString(),
        label: field.FieldName,
        content: (
          <FieldTable
            field={field}
            setFields={setFields}
          />
        ),
      }))
    : [];

  const handleNext = () => {
    // add next page in future ticket
    navigate('/');
  };

  const handlePrevious = () => {
    navigate('/field-and-soil');
  };

  useEffect(() => {
    // There shouldn't be a need to check. If there is no nmp file here
    // an error needs to be given
    if (state.nmpFile) {
      setFields(JSON.parse(state.nmpFile).years[0].Fields);
    }
  }, [state.nmpFile]);

  // const crops = fields.map((fields) =>
  //   fields.Crops.map((crop) => ({
  //     CropName: crop.cropId,
  //   }))
  // );

  return (
    <Card
      height="500px"
      width="700px"
      justifyContent='flex-start'
    >
      <CardHeader>
        <Banner>
          <Heading padding-right="1em">Calculate Nutrients</Heading>
            <TabOptions
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
        </Banner>
      </CardHeader>
      <ButtonWrapper position="left">
            <Button
              text="Add Fertilizer"
              size="sm"
              handleClick={handleNext}
              aria-label="Add Fertilizer"
              variant="primary"
              disabled={false}
            />
      </ButtonWrapper>
      {/* <TabContentDisplay
        tabs={tabs}
        activeTab={activeTab}
      /> */}
      {tabs.length > 0 && (
        <TabContentDisplay
          tabs={tabs}
          activeTab={activeTab}
        />
      )}
      <ButtonWrapper position="right">
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
      <ButtonWrapper position="left">
        <Button
          text="Back"
          size="sm"
          handleClick={() => {
            handlePrevious();
          }}
          aria-label="Back"
          variant="primary"
          disabled={false}
        />
      </ButtonWrapper>
    </Card>
  );
}
