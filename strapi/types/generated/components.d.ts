import type { Schema, Struct } from '@strapi/strapi';

export interface ProjectFeature extends Struct.ComponentSchema {
  collectionName: 'components_project_features';
  info: {
    displayName: 'Feature';
    icon: 'plus';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProjectSkill extends Struct.ComponentSchema {
  collectionName: 'components_project_skills';
  info: {
    displayName: 'Skill';
    icon: 'wrench';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProjectTag extends Struct.ComponentSchema {
  collectionName: 'components_project_tags';
  info: {
    displayName: 'Tag';
    icon: 'tag';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'project.feature': ProjectFeature;
      'project.skill': ProjectSkill;
      'project.tag': ProjectTag;
    }
  }
}
