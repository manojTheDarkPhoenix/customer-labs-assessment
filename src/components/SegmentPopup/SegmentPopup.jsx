import './SegmentPopup.css';
// Schema name and guidelines UI
export default function SegmentPopup () {
    return (
        <div className="popup-container">
            <p>
                Enter the Name of the Segment
            </p>
            <input name='segment_name' type='text' placeholder='Name of the segment' className='segment-input' />
            <p>To save your segment, you need to add the schemas to build the query</p>
        </div>
    );
}