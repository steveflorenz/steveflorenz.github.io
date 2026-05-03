import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/GoogleAuto.css";
import "../css/Projects.css";

const GoogleAuto = () => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);
  const navigate = useNavigate();

  const copyCode = () => {
    if (codeRef.current) {
      const code = codeRef.current.innerText;
      navigator.clipboard.writeText(code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <section className="reveal">
      <div className="container">
        <button onClick={() => navigate("/#projects")} className="back-btn">
          ← Back to Projects
        </button>
        <div className="project-header">
          <div className="project-number section-label">Project 002</div>
          <div className="project-title">
            Google Accountability Form Automation
          </div>
          <div className="project-meta">2024 — 2025</div>
        </div>
        <div className="tags">
          <span className="tag tag-cyan">Google</span>
          <span className="tag tag-cyan">Javascript</span>
          <span className="tag tag-green">Workflow</span>
          <span className="tag tag-red">Conversion</span>
        </div>
        <div className="section-label">About this project</div>
        <div className="project-description">
          A simple, practical solution built to make accountability reporting
          easier and more organied without adding any cost. The idea was
          toreplace a messy or manual process with something people could
          actually use without friction. I used Google Froms as the front-end so
          submissions would be quick and accessible, then treated Google Sheets
          as a lightweight database to keep everything structured and trackable
          in real time. From there, I added Google App Script to handle the
          heavy lifting behind the scenes. The script automates the flow after
          submission – generating a reference number, adding timestamps,
          processing the data into a clean PDF, and automatically sending it
          back via email to the person who submitted it. Overall, it turned a
          basic set of free tools into a small but functional system: easy to
          deploy, easy to maintain, and reliable enough to keep records organied
          without needing extra infrastructure or budget.
        </div>
        <div className="section-label" id="source-code">
          Source Code
        </div>
        <div className="code-wrapper">
          <div className="code-header">
            <span className="code-lang">Google Script</span>
            <button
              className="copy-btn"
              onClick={copyCode}
              style={{ color: copied ? "#00ff80" : "" }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="code-scroll">
            <pre ref={codeRef} id="code-block">
              function myFunction() {"{"}
              {"\n"}
              {"\n"}
              {"  "}const lock = LockService.getScriptLock();{"\n"}
              {"  "}lock.waitLock(30000); // prevent duplicate ref codes{"\n"}
              {"\n"}
              {"  "}try {"{"}
              {"\n"}
              {"    "}const ss = SpreadsheetApp.getActiveSpreadsheet();{"\n"}
              {"    "}const sheet = ss.getSheetByName("Form");{"\n"}
              {"\n"}
              {"    "}const lastRow = sheet.getLastRow();{"\n"}
              {"\n"}
              {"    "}// ===== CONFIG ====={"\n"}
              {"    "}const REF_COL = 41; // &lt;- REFERENCE code column in the
              spreadsheet{"\n"}
              {"    "}const EMAIL_COL = 2; // &lt;- EMAIL column in the
              spreadsheet
              {"\n"}
              {"    "}const NAME_COL = 4; // &lt;- FULL NAME column in the
              spreadsheet{"\n"}
              {"\n"}
              {"    "}const adminEmails = [{"\n"}
              {"      "}"admin@email.com"{"\n"}
              {"    "}];{"\n"}
              {"\n"}
              {"    "}// ===== GET VALUES ====={"\n"}
              {"    "}const respondentName = sheet.getRange(lastRow,
              NAME_COL).getValue();{"\n"}
              {"    "}const respondentEmail = sheet.getRange(lastRow,
              EMAIL_COL).getValue();{"\n"}
              {"\n"}
              {"    "}const respNameSanitizer = respondentName{"\n"}
              {"      "}.toString(){"\n"}
              {"      "}.trim(){"\n"}
              {"      "}.replace(/[^a-zA-Z0-9 ]/g, ""){"\n"}
              {"      "}.replace(/\s+/g, "_");{"\n"}
              {"\n"}
              {"    "}// ===== REFERENCE CODE ====={"\n"}
              {"    "}const prefix = "ACF";{"\n"}
              {"    "}const year = new
              Date().getFullYear().toString().slice(-2);
              {"\n"}
              {"\n"}
              {"    "}let nextNumber = 1;{"\n"}
              {"\n"}
              {"    "}//{"    "}cell {"\n"}
              {"    "}if (lastRow &gt; 1) {"{"}
              {"\n"}
              {"    "}const refColValues = sheet.getRange(2, REF_COL, lastRow -
              1).getValues().flat(); // only up to lastRow{"\n"}
              {"    "}// Start from the bottom to find the last non-empty cell
              {"\n"}
              {"    "}for (let i = refColValues.length - 1; i &gt;= 0; i--){" "}
              {"{"}
              {"\n"}
              {"      "}if (refColValues[i]) {"{"}
              {"\n"}
              {"        "}const parts = refColValues[i].split("-");{"\n"}
              {"        "}const num = parseInt(parts[2], 10);{"\n"}
              {"        "}nextNumber = isNaN(num) ? 1 : num + 1; // increment
              {"\n"}
              {"        "}break;{"\n"}
              {"      "}
              {"}"}
              {"\n"}
              {"    "}
              {"}"}
              {"\n"}
              {"  "}
              {"}"}
              {"\n"}
              {"\n"}
              {"    "}const nextCode = `${"{"}prefix{"}"}-${"{"}year{"}"}-${"{"}
              nextNumber.toString().padStart(3, "0"){"}"}`;{"\n"}
              {"    "}sheet.getRange(lastRow, REF_COL).setValue(nextCode);{"\n"}
              {"\n"}//{"  "}sleep program to load cell updates{"\n"}
              {"    "}SpreadsheetApp.flush();{"\n"}
              {"    "}Utilities.sleep(500);{"\n"}
              {"\n"}
              {"    "}// ===== EMAIL ====={"\n"}
              {"    "}const subject = `Accountability Form Submitted with Ref
              code: ${"{"}nextCode{"}"}`;{"\n"}
              {"\n"}
              {"    "}const body = `&lt;div style="background-color: #f5f7fa;
              padding: 10px; font-family: Montserrat, sans-serif; color:
              #000;"&gt;
              {"\n"}
              {"                  "}&lt;div style="max-width: 600px; margin:
              auto; background: white; padding: 20px; border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);"&gt;{"\n"}
              {"                    "}&lt;!-- Header --&gt;{"\n"}
              {"                      "}&lt;div style="text-align: center;"&gt;
              {"\n"}
              {"                        "}&lt;h2 style="margin: 0; color:
              #e26c15"&gt;Accountability Form&lt;/h2&gt;{"\n"}
              {"                      "}&lt;/div&gt;{"\n"}
              {"\n"}
              {"                      "}&lt;!-- Body Content --&gt;{"\n"}
              {"                      "}&lt;div style="padding: 25px; color:
              #000;"&gt;{"\n"}
              {"                        "}&lt;p&gt;Your
              &lt;strong&gt;Accountability Form&lt;/strong&gt; has been
              recorded. Please review the attached PDF for details.&lt;/p&gt;
              {"\n"}
              {"\n"}
              {"                        "}&lt;div style="background-color:
              #f8d7da; color: #721c24; padding: 15px; margin: 20px 0;
              border-left: 5px solid #dc3545;"&gt;{"\n"}
              {"                          "}&lt;strong&gt;Reference Code:
              &lt;/strong&gt; ${"{"}nextCode{"}"}
              {"\n"}
              {"                        "}&lt;/div&gt;{"\n"}
              {"\n"}
              {"                        "}&lt;p&gt;Kindly review the details in
              the attached document. If everything is in order, please proceed
              with your signature and submit the signed pdf by clicking the
              button below.&lt;/p&gt;{"\n"}
              {"                        "}&lt;p&gt;If you have questions or need
              assistance, feel free to reach out.&lt;/p&gt; &lt;br&gt;{"\n"}
              {"\n"}
              {"                        "}&lt;p style="text-align: center;
              margin: 5px 0;"&gt;{"\n"}
              {"                          "}&lt;a href="link-to-final submit "
              style="{"\n"}
              {"                            "}background-color: #e26c15;{"\n"}
              {"                            "}color: #ffffff;{"\n"}
              {"                            "}padding: 12px 24px;{"\n"}
              {"                            "}text-decoration: none;{"\n"}
              {"                            "}border-radius: 5px;{"\n"}
              {"                            "}display: inline-block;{"\n"}
              {"                            "}font-weight: bold;{"\n"}
              {"                          "}"&gt;{"\n"}
              {"                            "}Submit Accountability{"\n"}
              {"                          "}&lt;/a&gt;{"\n"}
              {"                        "}&lt;/p&gt;{"\n"}
              {"\n"}
              {"                        "}&lt;p style="margin-top: 30px;
              text-align: center"&gt;&lt;strong&gt;SAMPOL
              CORPORATION&lt;/strong&gt;&lt;/p&gt;
              {"\n"}
              {"                      "}&lt;/div&gt;{"\n"}
              {"\n"}
              {"                      "}&lt;!-- Footer --&gt;{"\n"}
              {"                      "}&lt;div style="background-color:
              #e9ecef; padding: 15px; text-align: center; font-size: 12px;
              color: #6c757d;"&gt;{"\n"}
              {"                        "}This is an automated message from the
              SAMPOL Accountability Submission System.{"\n"}
              {"                      "}&lt;/div&gt;{"\n"}
              {"                  "}&lt;/div&gt;{"\n"}
              {"                "}&lt;/div&gt;{"\n"}
              {"              "}`;{"\n"}
              {"\n"}
              {"    "}// ===== PDF EXPOR ====={"\n"}
              {"    "}const url = 'https://docs.google.com/spreadsheets/d/' +
              ss.getId() + '/export?';{"\n"}
              {"    "}const pageFormat ={"\n"}
              {"      "}'exportFormat=pdf&amp;format=pdf' +{"\n"}
              {"      "}'&amp;size=A4' +{"\n"}
              {"      "}'&amp;portrait=true' +{"\n"}
              {"      "}'&amp;top_margin=0.25' +{"\n"}
              {"      "}'&amp;bottom_margin=0.25' +{"\n"}
              {"      "}'&amp;left_margin=0.25' +{"\n"}
              {"      "}'&amp;right_margin=0.25' +{"\n"}
              {"      "}'&amp;scale=2' +{"\n"}
              {"      "}'&amp;horizontal_alignment=CENTER' +{"\n"}
              {"      "}'&amp;sheetnames=false&amp;printtitle=false' +{"\n"}
              {"      "}'&amp;pagenumbers=false&amp;gridlines=false' +{"\n"}
              {"      "}'&amp;fzr=false' +{"\n"}
              {"      "}'&amp;gid=28665067';{"\n"}
              {"\n"}
              {"    "}const params = {"{"}
              {"\n"}
              {"      "}method: "GET",{"\n"}
              {"      "}headers: {"{"} "Authorization": "Bearer " +
              ScriptApp.getOAuthToken() {"}"}
              {"\n"}
              {"    "}
              {"}"};{"\n"}
              {"\n"}
              {"    "}const pdfBlob = UrlFetchApp{"\n"}
              {"      "}.fetch(url + pageFormat, params){"\n"}
              {"      "}.getBlob(){"\n"}
              {"      "}.setName(`${"{"}nextCode{"}"}_${"{"}respNameSanitizer
              {"}"}
              .pdf`);{"\n"}
              {"\n"}
              {"    "}// ===== SEND TO ADMINS ====={"\n"}
              {"    "}for (const email of adminEmails) {"{"}
              {"\n"}
              {"      "}MailApp.sendEmail(email, subject, body, {"{"}
              {"\n"}
              {"        "}htmlBody: body,{"\n"}
              {"        "}attachments: [pdfBlob],{"\n"}
              {"        "}name: "IT Team"{"\n"}
              {"      "}
              {"}"});{"\n"}
              {"    "}
              {"}"}
              {"\n"}
              {"\n"}
              {"    "}// ===== SEND TO RESPONDENT ====={"\n"}
              {"    "}if (respondentEmail &amp;&amp;
              respondentEmail.toString().includes("@")) {"{"}
              {"\n"}
              {"      "}MailApp.sendEmail(respondentEmail, subject, body, {"{"}
              {"\n"}
              {"        "}htmlBody: body,{"\n"}
              {"        "}attachments: [pdfBlob],{"\n"}
              {"        "}name: "IT Team"{"\n"}
              {"      "}
              {"}"});{"\n"}
              {"    "}
              {"}"}
              {"\n"}
              {"\n"}
              {"  "}
              {"}"} finally {"{"}
              {"\n"}
              {"    "}lock.releaseLock();{"\n"}
              {"  "}
              {"}"}
              {"\n"}
              {"}"}
              {"\n"}
              {"        "}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleAuto;
