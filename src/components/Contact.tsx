import { useState, useRef } from "react";
import "./css/Contact.css";
import { MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";

interface FormErrors {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const validateField = (id: keyof FormErrors, value: string): string => {
    if (value.trim() === "") return `// ${id} is required`;
    if (id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
      return "// invalid email format";
    return "";
  };

  const handleBlur = (id: keyof FormErrors, value: string) => {
    setErrors((prev) => ({ ...prev, [id]: validateField(id, value) }));
  };

  const handleChange = (id: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameVal = nameRef.current?.value ?? "";
    const emailVal = emailRef.current?.value ?? "";
    const messageVal = messageRef.current?.value ?? "";

    const nameErr = validateField("name", nameVal);
    const emailErr = validateField("email", emailVal);
    const messageErr = validateField("message", messageVal);

    setErrors({ name: nameErr, email: emailErr, message: messageErr });

    if (nameErr || emailErr || messageErr) return;

    setSubmitting(true);

    const data = new FormData();
    data.append("name", nameVal);
    data.append("email", emailVal);
    data.append("subject", subjectRef.current?.value ?? "");
    data.append("message", messageVal);

    try {
      await fetch("https://formsubmit.co/ajax/tebmendoza@proton.me", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setErrors({ name: "", email: "", message: "" });
    if (nameRef.current) nameRef.current.value = "";
    if (emailRef.current) emailRef.current.value = "";
    if (subjectRef.current) subjectRef.current.value = "";
    if (messageRef.current) messageRef.current.value = "";
  };

  return (
    <section id="contact">
      <div className="section-label">Contact</div>
      <h2 className="section-title">
        Let's build
        <br />
        <em>something</em>
      </h2>
      <p className="about-text" style={{ marginTop: 24 }}>
        Open to freelance engagements, full-time roles, and security research
        collaborations. Response time &lt; 24h.
      </p>
      <div className="contact-inner">
        <div className="reveal" style={{ transitionDelay: "0.2s" }}>
          {submitted ? (
            <div id="form-success">
              <div
                style={{
                  fontSize: 32,
                  marginBottom: 16,
                  color: "var(--accent)",
                }}
              >
                <MdMarkEmailRead />
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--accent2)",
                  marginBottom: 8,
                }}
              >
                Message Sent!
              </div>
              <div
                style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: 12,
                  color: "var(--muted)",
                }}
              >
                I'll get back to you within 24h.
              </div>
              <button
                onClick={resetForm}
                className="form-submit"
                style={{ marginTop: 28 }}
              >
                <span>Send Another</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="contact-form">
                <div className="form-group">
                  <label className="form-label">
                    Name <span style={{ color: "var(--accent4)" }}>*</span>
                  </label>
                  <input
                    ref={nameRef}
                    type="text"
                    className={`form-input ${errors.name ? "invalid" : ""}`}
                    name="name"
                    placeholder="Your name"
                    onBlur={(e) => handleBlur("name", e.target.value)}
                    onChange={() => handleChange("name")}
                  />
                  {errors.name && (
                    <span className="field-error">{errors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Email <span style={{ color: "var(--accent4)" }}>*</span>
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    className={`form-input ${errors.email ? "invalid" : ""}`}
                    name="email"
                    placeholder="you@example.com"
                    onBlur={(e) => handleBlur("email", e.target.value)}
                    onChange={() => handleChange("email")}
                  />
                  {errors.email && (
                    <span className="field-error">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    ref={subjectRef}
                    type="text"
                    className="form-input"
                    name="subject"
                    placeholder="What's it about?"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Message <span style={{ color: "var(--accent4)" }}>*</span>
                  </label>
                  <textarea
                    ref={messageRef}
                    className={`form-input ${errors.message ? "invalid" : ""}`}
                    name="message"
                    placeholder="Tell me about your project, vulnerability, or just say hi..."
                    onBlur={(e) => handleBlur("message", e.target.value)}
                    onChange={() => handleChange("message")}
                  />
                  {errors.message && (
                    <span className="field-error">{errors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="form-submit"
                  disabled={submitting}
                >
                  <span>{submitting ? "Sending..." : "Send Message"}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="contact-left reveal">
          <div className="contact-links">
            <a href="mailto:tebmendoza@proton.me" className="contact-link-item">
              <div className="contact-link-icon">
                <MdEmail />
              </div>
              <div>
                tebmendoza@proton.me
                <span className="contact-link-meta">EMAIL</span>
              </div>
              <span className="contact-link-arrow">→</span>
            </a>
            <a
              href="https://github.com/steveflorenz"
              className="contact-link-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="contact-link-icon">
                <FaGithub />
              </div>
              <div>
                github.com/steveflorenz
                <span className="contact-link-meta">GITHUB</span>
              </div>
              <span className="contact-link-arrow">→</span>
            </a>
            <a
              href="https://linkedin.com/in/sf-mendoza"
              className="contact-link-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="contact-link-icon">
                <FaLinkedin />
              </div>
              <div>
                linkedin.com/in/sf-mendoza
                <span className="contact-link-meta">LINKEDIN</span>
              </div>
              <span className="contact-link-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
