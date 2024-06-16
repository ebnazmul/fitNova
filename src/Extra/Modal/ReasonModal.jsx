const ReasonModal = ({rejectedReason, setIsReasonModal}) => {
  return (
    <div className="fixed bg-gray-600 p-40 top-[20vh] left-96 rounded text-xl text-white">
      <h4>Rejected Reason: </h4>
      <p>{rejectedReason}</p>
      <button onClick={()=>setIsReasonModal(false)} className="px-2 py-1 bg-green-400 mt-4 text-gray-600 rounded">Close</button>
    </div>
  );
};

export default ReasonModal;
