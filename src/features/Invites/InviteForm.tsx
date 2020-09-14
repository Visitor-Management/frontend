import React, {FunctionComponent, useEffect, useState} from 'react';
import {Box, createStyles, Grid, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {ArrowBackIos, CameraAlt} from "@material-ui/icons";
import TextInput from "../../components/TextInput";
import SelectInput from "../../components/SelectInput";
import CustomButton from "../../components/Button";
import {BrowserRouterProps, Redirect, RouteComponentProps} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {VisitorInfo} from "../../api/Apis";

const useStyles = makeStyles((theme: Theme) => createStyles({
    paper: {
        backgroundColor: '#E7ECF6',
        borderRadius: theme.shape.borderRadius - 5,
        marginRight: 30,
        height: '100%',
    },
    header: {
        fontSize: '22px',
        fontWeight: 'bold',
        padding: theme.spacing(2, 0, 0, 4),
        color: theme.palette.text.primary
    },
    headerSecondary: {
        fontSize: '20px',
        fontWeight: 'bold',
        padding: theme.spacing(0, 0, 4, 0),
        color: theme.palette.text.primary,
    },
    arrowBack: {
        height: '30px',
        verticalAlign: 'bottom',
        cursor: 'pointer',
    },
    imageContainer: {
        padding: theme.spacing(0, 0, 0, 8),
    },
    imageUpload: {
        position: 'relative',
        backgroundColor: '#fff',
        height: '100px',
        width: '100px',
        textAlign: 'center',
        borderRadius: theme.shape.borderRadius,
        '& > svg': {
            height: '100%',
            opacity: 0.7,
            fontSize: '44px'
        }
    },
    visitorInfo: {
        padding: theme.spacing(2, 0, 1, 8),
    },
    appointment: {
        padding: theme.spacing(1, 0, 2, 8),
    },
    rightInputs: {
        marginTop: 134,
    },
    button: {
        marginRight: 20
    },
    selectInput: {
        '& > .makeStyles-inputContainer-32': {
            // padding: 0
        }
    },
    inputGrid: {
        marginTop: '30px',
        padding: theme.spacing(1, 0, 0, 2)
    }
}))

const selectInputMenu = [{
    title: 'Check Out'
}, {
    title: 'Alert'
}, {
    title: 'Delete'
}]

interface OwnProps extends RouteComponentProps<any> {
}

type Props = OwnProps;

const InviteForm: FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    const defaultInputState = {
        id: Number,
        avatar: '',
        name: '',
        mobileNo: Number,
        personToMeet: '',
        purpose: '',
        inTime: '',
        outTime: '',
    }

    const [inputState, setInputState] = useState<VisitorInfo>(defaultInputState)

    const handleChange = (e: any) => setInputState({
        ...inputState,
        [e.target.name]: e.target.value
    })

    // const {
    //     visitors,
    //     visitorsById,
    //     isLoading: isLoadingVisitor,
    //     error
    // } = useSelector((state: RootState) => state.visitors)
    //
    //
    // const id = props.match.params.visitorId
    // useEffect(() => {
    //     if (visitorsById[id]) {
    //         setInputState(visitorsById[id])
    //     }
    //     console.log(visitors, inputState)
    // }, [id])

    return (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <form>
                    <div className={classes.header}>
                        <ArrowBackIos className={classes.arrowBack} onClick={() => props.history.push('/')}/>
                        <span> Visitor's Details</span>
                    </div>
                            <Box display="flex" justifyContent="flex-end">
                                <Box className={classes.button}>
                                    <CustomButton>Save</CustomButton>
                                </Box>
                            </Box>
                    <Grid className={classes.inputGrid} container>
                        <Grid item xs={6}>
                            <div>
                                <TextInput label="Schedule Time"
                                           type="text"
                                           name="outTime"
                                           value={inputState.outTime}
                                           onChange={handleChange}/>
                                <TextInput label="Visitor Name"
                                           name="name"
                                           onChange={handleChange}
                                           value={inputState.name}/>
                                <TextInput label="Mobile Number"
                                           name="mobileNo"
                                           onChange={handleChange}
                                           value={inputState.mobileNo}/>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput
                                label="Email"
                                onChange={(e) => console.log(e)}
                                value=""/>
                            <TextInput
                                label="Person To Meet"
                                onChange={(e) => console.log(e)}
                                value=""/>
                            <TextInput
                                label="Purpose to visit"
                                name="purpose"
                                onChange={handleChange}
                                value={inputState.purpose}/>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6} style={{marginTop: '52px'}}>
                        </Grid>
                    </Grid>
                </form>

            </Paper>
        </Grid>
    );
};

export default InviteForm;
