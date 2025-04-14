import { Form, Formik } from "formik";
import CustomInput from "../../commons/customInput";
import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/useUsers";
import { useUserThemeContext } from "../../contexts/UserAndTheme";

export default function Register(){
    const {setUser,theme}=useUserThemeContext();
    const register=useRegister();

    const initialValues={
        username:"",
        email:"",
        profileImage:"",
        password:"",
        repass:""
    }

    async function onRegister(){

    }

    return (
        <Formik initialValues={initialValues} onSubmit={onRegister}>
            {
                (props)=>(
                    <Form className={`form ${theme == "dark" ? "darkTheme-dark" : "whiteTheme-light"}`}>
                        <h2>Here you can create your account.</h2>
                        <p className="input">
                            <CustomInput label="Username" type="text" name="username" className={theme == "dark" ? "darkTheme-light" : "whiteTheme-darkWhite"}/>
                            <CustomInput label="Email" type="text" name="email" className={theme == "dark" ? "darkTheme-light" : "whiteTheme-darkWhite"}/>
                            <CustomInput label="Profile image" type="text" name="profileImage" className={theme == "dark" ? "darkTheme-light" : "whiteTheme-darkWhite"}/>
                            <CustomInput label="Password" type="text" name="password" className={theme == "dark" ? "darkTheme-light" : "whiteTheme-darkWhite"}/>
                            <CustomInput label="Repeat password" type="text" name="repass" className={theme == "dark" ? "darkTheme-light" : "whiteTheme-darkWhite"}/>
                        </p>
                        <button type="submit">Submit</button>
                        <p>Already have account? You can <Link to="/login">login</Link> here.</p>
                    </Form>
                )
            }
        </Formik>
    )
}