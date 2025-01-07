import { useState } from 'react';
import { Dropdown } from '../../../components/common';
import { InfoBox } from './soilTests.styles';

export default function SoilTests() {
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

  const soilTestOptions = [
    { value: 1, label: 'No Soil Test from within the past 3 years' },
    { value: 2, label: 'Other Lab (Bicarbonate and Amm Acetate' },
  ];

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setSoilTestData({ ...soilTestData, [name]: value });
  };

  return (
    <div>
      <InfoBox>Do you have soil test from within the past 3 years?</InfoBox>
      <Dropdown
        label="Lab (Soil Test Method)"
        name="SoilTest"
        value={soilTestData.SoilTest}
        options={soilTestOptions}
        onChange={handleChange}
      />
    </div>
  );
}
