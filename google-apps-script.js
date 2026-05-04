function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    var nom = data.Nom || "-";
    var prenom = data.Prenom || "-";
    var message = data.Message || "-";
    
    var subject = "Message portfolio - " + prenom + " " + nom;
    var body = "Nouveau message recu depuis le portfolio :\n\n"
      + "Nom : " + nom + "\n"
      + "Prenom : " + prenom + "\n\n"
      + "Message :\n" + message;
    
    var htmlBody = "<h2>Nouveau message du portfolio</h2>"
      + "<table style='border-collapse:collapse;width:100%;max-width:500px'>"
      + "<tr style='background:#0f4c81;color:#fff'><th style='padding:10px;text-align:left'>Champ</th><th style='padding:10px;text-align:left'>Valeur</th></tr>"
      + "<tr style='background:#f4f7fb'><td style='padding:10px;font-weight:bold'>Nom</td><td style='padding:10px'>" + nom + "</td></tr>"
      + "<tr><td style='padding:10px;font-weight:bold'>Prenom</td><td style='padding:10px'>" + prenom + "</td></tr>"
      + "<tr style='background:#f4f7fb'><td style='padding:10px;font-weight:bold'>Message</td><td style='padding:10px'>" + message.replace(/\n/g, "<br>") + "</td></tr>"
      + "</table>";
    
    MailApp.sendEmail({
      to: "billalmechekour@gmail.com",
      subject: subject,
      body: body,
      htmlBody: htmlBody
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "Portfolio contact webhook is active" }))
    .setMimeType(ContentService.MimeType.JSON);
}
