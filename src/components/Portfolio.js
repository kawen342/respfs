import React, { useState } from 'react';

function Portfolio() {
  // State untuk daftar proyek
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Project 1',
      description: 'Project 1 Description',
      imagePath: 'https://imgur.com/YKXSOrK.png',  // Menggunakan imagePath
      pdfUrl: null, // URL PDF proyek (jika ada)
      pdfName: null, // Nama file PDF
    },
  ]);

  const [selectedFile, setSelectedFile] = useState(null);

  // Fungsi untuk menangani unggahan file
  const handleFileUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Fungsi untuk menambah proyek baru dengan PDF
  const addProjectWithPDF = () => {
    if (selectedFile) {
      const newId = projects.length + 1;
      const newProject = {
        id: newId,
        title: `Project ${newId}`,
        description: `Project ${newId} Description`,
        imagePath: 'https://via.placeholder.com/300x200.png?text=PDF+Uploaded', // Placeholder gambar
        pdfUrl: URL.createObjectURL(selectedFile), // URL lokal untuk file PDF
        pdfName: selectedFile.name, // Menyimpan nama file PDF
      };
      setProjects([...projects, newProject]);
      setSelectedFile(null); // Reset input file
    } else {
      alert('Please select a file first!');
    }
  };

  // Fungsi untuk menghapus proyek
  const deleteProject = (id) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
  };

  // Fungsi untuk mendownload file (gambar atau PDF)
  const downloadProject = (fileUrl, fileName) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName; // Nama file saat diunduh
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h2>Portfolio</h2>

      {/* Input dan tombol untuk upload PDF */}
      <div className="mb-3">
        <input
          type="file"
          className="form-control"
          onChange={handleFileUpload}
          accept=".pdf"
        />
        <button
          onClick={addProjectWithPDF}
          className="btn btn-primary mt-2"
        >
          Tambah Proyek dengan PDF
        </button>
      </div>

      <div className="row">
        {projects.map((project) => (
          <div className="col-md-4" key={project.id}>
            <div className="card mb-3">
              {/* Jika proyek memiliki PDF, tampilkan nama file PDF */}
              <div className="card-body">
                <h5 className="card-title">{project.title}</h5>
                <p className="card-text">{project.description}</p>
                
                {/* Tampilkan gambar atau placeholder untuk PDF */}
                <div className="card-img-top">
                  {project.pdfUrl ? (
                    <div>
                      <p>PDF Uploaded: {project.pdfName}</p>
                    </div>
                  ) : (
                    <img
                      src={project.imagePath}
                      alt={project.title}
                      className="card-img-top"
                    />
                  )}
                </div>

                {/* Gunakan flexbox untuk tata letak tombol */}
                <div className="d-flex justify-content-between">
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="btn btn-danger"
                  >
                    Hapus Proyek
                  </button>
                  {/* Tombol download */}
                  {project.pdfUrl ? (
                    <button
                      onClick={() =>
                        downloadProject(project.pdfUrl, project.pdfName)
                      }
                      className="btn btn-success"
                    >
                      Download PDF
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        downloadProject(
                          project.imagePath,
                          `${project.title}.png`
                        )
                      }
                      className="btn btn-success"
                    >
                      Download Gambar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
