import React from "react";

function ZoomImage({ image, onclose }) {
  return (
    <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center'>

        <div className='bg-white shadow-lg rounded min-w-[60vw] mx-auto p-4'>
                
        <button
            className="block ml-auto text-2xl cursor-pointer "
            onClick={onclose}
          >
            <i className="fa-regular fa-rectangle-xmark"></i>
          </button>

                <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh] ml-auto mr-auto'>
                    <img src={image}  className="max-w-[90vh] max-h-[70vh] object-cover" style={{width:"90%", height:"90%"}}/>
                </div>
        </div>
  


    </div>
  );
}

export default ZoomImage;
