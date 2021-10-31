import React from "react";
import './LoginPage.css'
import Grid from '@material-ui/core/Grid';
import inst_image from '../../images/9364675fb26a.svg';
import insta_logo from '../../images/logoinsta.png';
import SignIn from "../../Components/SignIn";
const LoginPage = () => {
    return (
        <div style={{marginTop: '80px'}}>
            <Grid container>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={6}>
                    <div className="loginpage__main">
                        <div>
                        <img src={inst_image} width="454px" className="loginpage__img__phone"/>
                        </div>
                        <div>
                            <div className="loginpage_rightcomponent">
                                <img className="loginpage__logo" src={insta_logo} />
                                <div className="loginPage__signin">
                                 <SignIn/>
                                </div>
                            </div>
                            <div className="loginpage__signupoption">
                                <div className="loginPage__signin">
                                    Don't have an account? <span style={{ "fontWeight":"bold", "color":"#0395F6"}}>Sign up</span>
                                </div>                          
                            </div>
                        </div>                        
                    </div>
                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>
        </div>
    )
}

export default LoginPage