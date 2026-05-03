import { useState, useEffect, useCallback } from "react";
import "./css/Certificates.css";

const galleries: Record<string, { title: string; images: string[] }> = {
  blackbelt: {
    title: "Blackbelt Meraki",
    images: [
      "src/assets/Certs/blackbelt1.png",
      "src/assets/Certs/blackbelt2.png",
    ],
  },
  sixsigma: {
    title: "Six Sigma Training",
    images: [
      "src/assets/Certs/SixSigma_WhiteBelt-cert.png",
      "src/assets/Certs/SixSigma_YellowBelt-Cert.png",
    ],
  },
  cisco: {
    title: "Cisco — Net & OS",
    images: [
      "src/assets/Certs/Net_cert_sfdmendoza.png",
      "src/assets/Certs/OS_cert_sfdmendoza.png",
    ],
  },
  educba: {
    title: "EDUCBA — Data Science",
    images: ["src/assets/Certs/Educba_cert.png"],
  },
  simplilearn: {
    title: "Simplilearn — Data Science",
    images: ["src/assets/Certs/DataScience_by_Simplilearn_SFM.png"],
  },
  kaggle: {
    title: "Kaggle",
    images: ["src/assets/Certs/kaggle.png"],
  },
};

const CertificateGallery = () => {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgOpacity, setImgOpacity] = useState(1);
  const [imgSrc, setImgSrc] = useState("");
  const [loading, setLoading] = useState(false);

  const isOpen = activeKey !== null;
  const gallery = activeKey ? galleries[activeKey] : null;
  const total = gallery?.images.length ?? 0;

  const showImage = useCallback((index: number, key: string) => {
    const imgs = galleries[key].images;
    setCurrentIndex(index);
    setImgOpacity(0);
    setLoading(true);

    const tmp = new Image();
    tmp.onload = () => {
      setImgSrc(imgs[index]);
      setImgOpacity(1);
      setLoading(false);
    };
    tmp.src = imgs[index];
  }, []);

  const openGallery = (key: string) => {
    setActiveKey(key);
    setCurrentIndex(0);
    showImage(0, key);
    // document.body.style.overflow = "hidden";
  };

  const closeGallery = useCallback(() => {
    setActiveKey(null);
    setImgSrc("");
    // document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const changeImage = useCallback(
    (dir: number) => {
      if (!activeKey) return;
      const next = currentIndex + dir;
      if (next >= 0 && next < galleries[activeKey].images.length) {
        showImage(next, activeKey);
      }
    },
    [activeKey, currentIndex, showImage],
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") changeImage(1);
      if (e.key === "ArrowLeft") changeImage(-1);
      if (e.key === "Escape") closeGallery();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, changeImage, closeGallery]);

  return (
    <>
      <div className="section-label">TRAINING</div>
      <h2 className="section-title">
        CERTIFI<em>CATES</em>
      </h2>
      <div className="ctf-row reveal" style={{ transitionDelay: "0.3s" }}>
        <div className="ctf-badge" onClick={() => openGallery("blackbelt")}>
          Blackbelt Meraki
        </div>
        <div
          className="ctf-badge green"
          onClick={() => openGallery("sixsigma")}
        >
          Six Sigma Training
        </div>
        <div className="ctf-badge green" onClick={() => openGallery("cisco")}>
          Cisco - Net &amp; OS
        </div>
        <div className="ctf-badge" onClick={() => openGallery("educba")}>
          EDUCBA - Data Science
        </div>
        <div className="ctf-badge" onClick={() => openGallery("simplilearn")}>
          Simplilearn - Data Science
        </div>
        <div className="ctf-badge green" onClick={() => openGallery("kaggle")}>
          Kaggle
        </div>
      </div>

      {isOpen && (
        <div id="lightbox" style={{ display: "flex" }}>
          <div id="lightbox-overlay" onClick={closeGallery} />
          <div id="lightbox-container">
            <div id="lightbox-header">
              <span id="lightbox-title">{gallery?.title}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span id="lightbox-counter">
                  {currentIndex + 1} / {total}
                </span>
                <button id="lightbox-close" onClick={closeGallery}>
                  ✕
                </button>
              </div>
            </div>

            <div id="lightbox-stage">
              <button
                className="lightbox-arrow"
                id="arrow-prev"
                onClick={() => changeImage(-1)}
                disabled={currentIndex === 0}
              >
                ←
              </button>
              <div id="lightbox-img-wrap">
                <img
                  id="lightbox-img"
                  src={imgSrc}
                  alt={gallery?.title}
                  style={{ opacity: imgOpacity }}
                />
                {loading && <div id="lightbox-loader">Loading...</div>}
              </div>
              <button
                className="lightbox-arrow"
                id="arrow-next"
                onClick={() => changeImage(1)}
                disabled={currentIndex === total - 1}
              >
                →
              </button>
            </div>

            <div id="lightbox-strip">
              {gallery?.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  className={`strip-thumb ${i === currentIndex ? "active" : ""}`}
                  onClick={() => showImage(i, activeKey!)}
                  alt={`${gallery.title} ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CertificateGallery;
