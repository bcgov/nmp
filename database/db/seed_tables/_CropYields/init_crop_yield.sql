CREATE TABLE IF NOT EXISTS temp_crop_yields (
  Id SERIAL PRIMARY KEY,
  CropId INT NOT NULL,
  LocationId INT NOT NULL,
  Amount DECIMAL(10,2) NOT NULL,
  StaticDataVersionId INT NOT NULL,
  PRIMARY KEY (Id, StaticDataVersionId)
);
\copy temp_crop_yields (Id,CropId, LocationId, Amount, StaticDataVersionId) from 'docker-entrypoint-initdb.d/_CropYields__20241212(in).csv' with header delimiter ',' CSV ;
SELECT * INTO crops_yields
FROM temp_crop_yields
WHERE StaticDataVersionId=14;
ALTER TABLE crops_yields
DROP COLUMN StaticDataVersionId;
