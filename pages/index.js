import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!file) return alert("Please upload a photo of your house.");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/generate", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setImageUrl(data.url);
    setLoading(false);
  };

  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(to bottom,#0a0a1a,#1a1a3d)",
      color:"#fff",
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center",
      padding:"2rem",
      fontFamily:"sans-serif"
    }}>
      <h1 style={{color:"#80ffea", textShadow:"0 0 10px #80ffea, 0 0 20px #80ffea", marginBottom:"2rem"}}>
        🎄 Christmas Lights Preview
      </h1>

      <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} style={{
        marginBottom:"1rem",
        border:"1px solid #80ffea",
        borderRadius:"8px",
        padding:"0.5rem",
        boxShadow:"0 0 10px #80ffea",
        background:"#0f0f2a",
        color:"#fff"
      }}/>

      <button onClick={handleGenerate} style={{
        padding:"0.5rem 1rem",
        borderRadius:"8px",
        border:"none",
        background:"#80ffea",
        color:"#0a0a1a",
        fontWeight:"bold",
        cursor:"pointer",
        boxShadow:"0 0 10px #80ffea, 0 0 20px #80ffea"
      }}>
        Generate
      </button>

      {loading && <p style={{color:"#80ffea", textShadow:"0 0 5px #80ffea"}}>Generating preview…</p>}

      {imageUrl && <div style={{marginTop:"2rem", textAlign:"center"}}>
        <h2 style={{color:"#80ffea", textShadow:"0 0 10px #80ffea"}}>Preview:</h2>
        <img src={imageUrl} alt="Christmas Lights Preview" style={{
          maxWidth:"100%",
          borderRadius:"12px",
          boxShadow:"0 0 20px #80ffea, 0 0 40px #80ffea",
          border:"1px solid #80ffea"
        }}/>
      </div>}
    </div>
  );
}
