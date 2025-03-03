import React, { useState } from 'react'


function Code() {

  const [img, setImg] = useState("");
  // const generate = () => { setImg("Assests/img1.jpg") };
  const [loading, setLoading] = useState(false);
  const [qrdata , setQrdata] = useState("") ;
  const [qrsize , setQrsize ] = useState("");

  async function generate() {
    setLoading(true);
    try {
      const url = `https://quickchart.io/qr?text=${encodeURIComponent(qrdata)}&color=ff0000&size=${(qrsize)} `;
      setImg(url);
    }  catch (error) {
      console.error ("Error 404 generating" , error);
    }
    finally {
      setLoading(false);
    }

  }

  function downloadqr(){
    fetch (img) .then((Response) => Response.blob()).then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download ="qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
  }

  return (
    <div className='container'>
      <h1> [ QR CODE GENERATOR ]</h1>
      {loading && <p> Please wait .......</p>}

      {img && <img src={img} className='img' alt="" />}


      <div>
        <label htmlFor="datainput" className='input-label'>
          Data for QR Code :
        </label>
        <input type="text" value={qrdata} id="datainput" placeholder='Enter data for QR Code' onChange={(e) =>
          setQrdata(e.target.value)
        } />
        <label htmlFor="sizeinput"  className='input-label'>
          Image Size (e.g., 150):
        </label>
        <input type="text" id="sizeinput" value={qrsize} onChange={(e) => setQrsize(e.target.value)} placeholder='Enter Image Size' />
        <button className='generate-button' onClick={generate} > Generate QR Code  </button>
        <button className='download-button' onClick={downloadqr} >Download QR Code</button>
      </div>

      <div className='footer'>
        <p>Created By <a href=""> Prakashjp </a> </p>
      </div>

    </div>
  );
}

const qrcode = () => {
  return (
    <div> <Code /> </div>
  )
}

export default qrcode