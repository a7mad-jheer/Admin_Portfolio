
type ErrorProps = {
  errorSchema : string
} 

export const ErrorSchema = ({errorSchema} : ErrorProps) => {
  return (
    <p className={`text-xs w-fit text-red-700 font-semibold `}>
        {errorSchema}
    </p>
  );
};

export default ErrorSchema;
