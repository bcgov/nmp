/**
 * @summary The Field List page for the application
 */
import { useNavigate } from 'react-router-dom';
import { CardHeader, Banner, Heading } from './fieldList.styles';
import { Card } from '../../components/common';

export default function FieldList() {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <Banner>
          <Heading>Field List</Heading>
        </Banner>
      </CardHeader>
    </Card>
  );
}
