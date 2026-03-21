import { Button } from "@material-ui/core";
import React,{useState,useEffect} from "react"
import "./Verification.css"
import moment from "moment"

const Verification = () => {
    const [value, setValue] = useState([]);
    const [isopen, setisopen] = useState(false);

    // ✅ FIXED useEffect
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/application/0`);
            const data = await res.json();
            console.log(data);
            setValue(data?.data || []);
        };

        fetchData();
    }, [isopen]);

    // ✅ CLEAN confirm function
    const handleConfirm = async(bookingId) => {
        let body = {
            confirm: true,
            bookedAt: moment(new Date).format('DD-MM-YYYY HH:mm:ss')
        }

        const res = await fetch(`/application/${bookingId}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)
        });

        const data = await res.json();

        if(data.status){
            alert("Bike confirmation successful");
            setisopen(prev => !prev); // refresh
        } else {
            alert("Something went wrong");
        }
    }

    return(
        <div className="Confirmation">
            <h1>CONFIRMATION</h1>
            {
                value?.length===0
                ? <h2>No Request for Confirmation</h2>
                :
                <div className="ConfirmationTable">
                    <div className="ConfirmationTableHead">
                        <div><b>Booking<br />Id</b></div>
                        <div><b>Requested<br />On</b></div>
                        <div><b>Customer<br />Id</b></div>
                        <div><b>Customer<br />Name</b></div>
                        <div><b>Vehicle<br />Number</b></div>
                        <div><b>Rate<br />(per day)</b></div>
                        <div><b>Duration<br />(in days)</b></div>
                        <div><b>Price</b></div>
                        <div></div>
                    </div>

                    {
                        value?.map((dt,index) => {
                            return(
                                <div className="ConfirmationTableBody" key={index}>
                                    <div>{dt?.bookingId}</div>
                                    <div>{dt?.requestedAt}</div>
                                    <div>{dt?.userID}</div>
                                    <div>{dt?.name}</div>
                                    <div>{dt?.vehicleNumber}</div>
                                    <div>{dt?.rate}</div>
                                    <div>{dt?.bookingDuration}</div>
                                    <div>{dt?.price}</div>

                                    <Button
                                        variant="contained"
                                        className="confirmBtn"
                                        onClick={() => handleConfirm(dt.bookingId)}
                                    >
                                        Confirm
                                    </Button>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default Verification;