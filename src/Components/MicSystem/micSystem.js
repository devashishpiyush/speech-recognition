import "./micSystem.css";

const MicSystem = () => {
    const listening = false;

    return (
        <>
            <div className="my-container">
                <div className="my-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-3"></div>
                            <div className="col-6">
                                <button className="btn btn-primary" ><span className="fa-solid fa-microphone fa-5x"></span></button>
                                <h4>Microphone: Off</h4>
                                <p>Transcript goes here</p><br />
                                <button className="btn btn-sm btn-danger mx-3 px-3">Clear</button>
                                <button className="btn btn-sm btn-primary mx-3 px-3">Show Log</button>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MicSystem;