import {z} from "zod";

export const ProjectSchema = z.object({
    title : z.string().min(6 , "Title is too small").max(50 , "Title is too long"),
    description : z.string().min(10 , "Description is too small").max(200),
    projectUrl : z.string().url(),
    image : z.instanceof(File)
    .refine((file) => file.size > 0 , "Image is required")
    .refine((file) => file.size <= 2 * 1024 *1024 , "The image size must be less than 2MB")
})

export const ProfileSchema = z.object({
    fullName : z.string().min(3 , "please Enter more than 3 character"),
    jobTitle : z.string().min(2 , "please Enter more than 2 character"),
    description : z.string().min(10 , "Enter character more than 10").max(200),
    image : z.instanceof(File)
    .refine((file) => file.size > 0 , "Please Upload Your Personal Photo")
    .refine((file) => file.size <= 1 * 1024 * 1024 , "Please Uoload Image Less Than 2MB")
})

export const SocialSchema = z.object({
    facebook : z.string().url("please Enter Vailed Url"),
    gmail : z.string().url("please Enter Vailed Url"),
    instagram : z.string().url("please Enter Vailed Url"),
    whatsapp : z.string().min(10 , "The Phone Number Is too Long"),
    linkedin : z.string().url("please Enter Vailed Url"),
})

export const AddProjectFormSchema = z.object({
    name : z.string().min(3 , "Name must be at least 3 characters"),
    description : z.string().min(10 , "Description too short").max(3000 , "Description too long" ),
    url : z.string().url().startsWith("http", "Must include http or https"),
    image : z.instanceof(File , {message : "Image is required"}),
    categoryId : z.number()
})

export const LoginSchema = z.object({
    email : z.string().email("Invalid email address"),
    password : z.string().min(6 , "Password must be at least 6 characters")
})

export const SignupSchema = z.object({
        name : z.string().min(3 , "Name must be at least 3 characters"),
        email : z.string().email("Invalid email address"),
        password : z.string().min(6 , "Password must be at least 6 characters"),
        user_name : z.string() .min(3, "Username must be at least 3 characters").regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, _ and -"),
})

export const bioSchema = z.object({
    fullName : z.string().min(3 , "Full name is too short. Minimum 3 characters.").max(30 , "Full name is too long. Maximam 20 characters."),
    jobTitle : z.string().min(3 , "Job title is too short. Minimum 3 characters.").max(50 , "Job title is too long. Maximam 25 characters."),
    description : z.string().min(15 , "Description is too short. Minimum 15 characters.").max(200 , "Description is too long. Maximam 150 characters."),
    image : z.instanceof(File , {message : "Image is required"}),
})

export const socialMediaSchema  = z.object({
    Gmail : z.string().email().optional().or(z.literal("")),
    Facebook :  z.string().url().optional().or(z.literal("")),
    Whatsapp :  z.string().url().optional().or(z.literal("")),
    Github :  z.string().url().optional().or(z.literal("")),
    LinkedIn :  z.string().url().optional().or(z.literal("")),
})

export const aboutSchema = z.object({
    about : z.string().min(20 , "About is too short. Minimum 20 characters.").max(300 , "About is too long. Maximum 200 characters.").or(z.literal("")),
    experience : z.string().min(20 , "Experience is too short. Minimum 20 characters.").max(300 , "Experience is too long. Maximum 200 characters.").or(z.literal("")),
    goals : z.string().min(20 , "Goals is too short. Minimum 20 characters.").max(300 , "Goals is too long. Maximum 200 characters.").or(z.literal("")),
})

export const EditProjects = z.object({
    Name : z.string().min(3 , "Name must be at least 3 characters"),
    Description : z.string().min(10 , "Description too short").max(170 , "Description too long" ),
    Url : z.string().url().startsWith("http", "Must include http or https"),
    image : z.instanceof(File , {message : "Image is required"}).optional(),
})

export const editBio = z.object({
    Full_Name : z.string().min(3 , "Full name is too short. Minimum 3 characters.").max(20 , "Full name is too long. Maximam 20 characters."),
    Job_Title : z.string().min(3 , "Job title is too short. Minimum 3 characters.").max(25 , "Job title is too long. Maximam 25 characters."),
    Description : z.string().min(15 , "Description is too short. Minimum 15 characters.").max(150 , "Description is too long. Maximam 150 characters."),
    image : z.instanceof(File , {message : "Image is required"}).optional(),
})