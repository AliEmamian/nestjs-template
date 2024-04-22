import { VersioningType } from '@nestjs/common';

export const versioningConfig = (app) => {
  app.enableVersioning({
    type: VersioningType.URI,
  });
};
