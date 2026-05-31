import {object,string} from "yup"
export const registerscheema=object().shape({
  Email:string().email().required('Must not be empty').test(
      'no-script-tag',
      'The text must not contain <script> tags or JavaScript code',
      (value) => {
        if (!value) return true; 
        const forbiddenPattern = /<\s*script.*?>.*?<\s*\/\s*script\s*>|javascript:|on\w+=/gis;
        return !forbiddenPattern.test(value);
      }
    ),
  Password:string().min(6).test(
      'no-script-tag',
      'The text must not contain <script> tags or JavaScript code',
      (value) => {
        if (!value) return true; 
        const forbiddenPattern = /<\s*script.*?>.*?<\s*\/\s*script\s*>|javascript:|on\w+=/gis;
        return !forbiddenPattern.test(value);
      }
    )
})
export const loginscheema=object().shape({
  Email:string().email().required('Must not be empty').test(
      'no-script-tag',
      'The text must not contain <script> tags or JavaScript code',
      (value) => {
        if (!value) return true; 
        const forbiddenPattern = /<\s*script.*?>.*?<\s*\/\s*script\s*>|javascript:|on\w+=/gis;
        return !forbiddenPattern.test(value);
      }
    ),
  Password:string().min(6).test(
      'no-script-tag',
      'The text must not contain <script> tags or JavaScript code',
      (value) => {
        if (!value) return true; 
        const forbiddenPattern = /<\s*script.*?>.*?<\s*\/\s*script\s*>|javascript:|on\w+=/gis;
        return !forbiddenPattern.test(value);
      }
    )
})
export const updateemailcheema=object().shape({
  Email:string().email().required('Must not be empty').test(
      'no-script-tag',
      'The text must not contain <script> tags or JavaScript code',
      (value) => {
        if (!value) return true; 
        const forbiddenPattern = /<\s*script.*?>.*?<\s*\/\s*script\s*>|javascript:|on\w+=/gis;
        return !forbiddenPattern.test(value);
      }
    )
})
export const contentschema =object().shape({
  body:string().required().test(
      'no-script-tag',
      'The text must not contain <script> tags or JavaScript code',
      (value) => {
        if (!value) return true; 
        const forbiddenPattern = /<\s*script.*?>.*?<\s*\/\s*script\s*>|javascript:|on\w+=/gis;
        return !forbiddenPattern.test(value);
      }
    ),
});

export const validate=(schema)=>async(req,res,next)=>{
  try {
    await schema.validate(req.body,{abortEarly:false});
    next();
  } catch (error) {
    const errortxt=error.errors.join(",")
    const err=new Error(errortxt)
    next(err)
  }
}