/* START DATA SECTION */
export type PROFILE__INFO_TYPE = {
  image: File | null;
  fullName: string;
  jobTitle: string;
  description: string;
};

export type SOCIAL__MEDIA__TYPE = {
  gmail: string;
  facebook: string;
  instagram: string;
  whatsapp: string;
  linkedin: string;
};
/* END DATA SECTION */

/* START SCHEMA TYPE */
export type PROJECT_SCHEMA_TYPE = {
  title?: string[];
  description?: string[];
  projectUrl?: string[];
  image?: string[];
};

export type PROFILE_SCHEMA_TYPE = {
  fullName?: string[];
  jobTitle?: string[];
  description?: string[];
  image?: string[];
};

export type SOCIAL__SCHEMA__TYPE = {
  gmail?: string[];
  facebook?: string[];
  instagram?: string[];
  whatsapp?: string[];
  linkedin?: string[];
};
/* END SCHEMA TYPE */

/* START ERROR SCHEMA TYPE */
  export type ERROR_SCHEMA_TYPE = {
  title?: string[];
  description?: string[];
  projectUrl?: string[];
  image?: string[];
};
/* END ERROR SCHEMA TYPE */



/*START PROJECT TYPE */
export type PROJECT__INFO_TYPE = {
  image: File | null;
  title: string;
  description: string;
  projectUrl: string;
};


