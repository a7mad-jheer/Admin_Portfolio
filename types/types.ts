 export type projects_Type = {
  id:number | null;
  name: string;
  description: string;
  url: string;
  image: string;
  user_id: string;
  categoryId : number
};

export type category_Type = {
  id : number ,
  name : string ,
  user_id : string
}

export type skills_Type = {
  id : number ,
  name : string ,
  user_id : string
}

export type bio_Type = {
  id : string ,
  full_name : string,
  job_title : string ,
  description : string ,
  image : string ,
  user_id : string,
}

export type social_Type = {
  id: string ,
  Gmail : string ,
  Facebook : string ,
  Github : string ,
  LinkedIn : string ,
  Whatsapp : string,
  user_id : string
}

export type about_Type = {
  id:string ,
  about : string,
  goals : string,
  experience : string
  user_id : string,
}