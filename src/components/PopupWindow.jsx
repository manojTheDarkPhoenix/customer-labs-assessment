import backIcon from '../assets/back-icon.png';
import SegmentPopup from './SegmentPopup/SegmentPopup';
import SchemaDropdown from './SchemaDropdown/SchemaDropdown';

export default function PopupWindow({hidePopup}) {

    // Validate segment_name and schema fields before form submission
    const validateFields = (e) => {
        e.preventDefault();
        const segmentName = e.target.segment_name.value;
        const schema = e.target.schema.value;
        
        console.log(typeof schema, schema);
        // Perform validation checks on segmentName and schema here
        if(segmentName.trim() !== '' && schema.length > 2) {
            e.target.submit();            
        } else {
            alert("Segment Name or Schema is empty!");
        }
    }

    return (
        // Form action to send data to server
        <form action="https://webhook.site/7d98ef2f-c4da-4d5e-92e4-dfbadedcf85a" 
            method="post" 
            onSubmit={validateFields}>
            <div className="App">
                <header className="App-header">
                <section className="header-section">
                    <img src={backIcon} alt="Back" className='back-icon' onClick={hidePopup}/>
                    <p className='header-text'>
                    Saving Segment
                    </p>          
                </section>        
                </header>
                <section className='popup-container'>
                    {/* Segment input fields and texts */}
                    <SegmentPopup />        
                    <div>
                    {/* Schema dropdowns add/update */}
                    <SchemaDropdown />
                    </div>        
                </section>
                {/* Action buttons */}
                <section className='button-container'>
                    <button className='btn-success' type='submit'>Save the Segment</button>
                    <button className='btn-cancel' type='button' onClick={hidePopup}>Cancel</button>
                </section>
            </div>
        </form>
    );
}