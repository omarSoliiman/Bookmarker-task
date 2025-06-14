var allSites = [];

if (localStorage.getItem("siteData")) {
  allSites = JSON.parse(localStorage.getItem("siteData"));
  displayWebSites();
}

function addSiteDataToTheTable() {
  var siteName = document.getElementById("siteNameId").value;
  var siteUrl = document.getElementById("urlId").value;

  var urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-z]{2,}(\/\S*)?$/;

  if (!siteName || !siteUrl) {
    alert("Please fill in both fields.");
    return;
  }

  if (!urlRegex.test(siteUrl)) {
    alert("Please enter a valid URL (e.g., https://example.com)");
    return;
  }

  var siteData = {
    sName: siteName,
    sUrl: siteUrl.startsWith("http") ? siteUrl : "https://" + siteUrl,
  };

  allSites.push(siteData);
  localStorage.setItem("siteData", JSON.stringify(allSites));
  displayWebSites();
  clearInputs();
}

function clearInputs() {
  document.getElementById("siteNameId").value = "";
  document.getElementById("urlId").value = "";
}

function displayWebSites() {
  function addHttp(url) {
    if (!/^https?:\/\//i.test(url)) {
      return "http://" + url;
    }
    return url;
  }

  var box = "";

  for (var i = 0; i < allSites.length; i++) {
    box += `
    <tr>
    <td> ${[i + 1]}</td>
    <td> ${allSites[i].sName}</td>
    <td> <a href="${addHttp(
      allSites[i].sUrl
    )}" target="_blank" class="btn btn-success">
          Visit
        </a></td>
    <td> <button onclick="DeleteSite(${i})" type="button" class="btn btn-danger"> <i class="fa-solid fa-eye pe-2"> Delete  </i></button></td>
    </tr>
    `;
  }

  document.getElementById("tBody").innerHTML = box;
}

function DeleteSite(pIndex) {
  allSites.splice(pIndex, 1);
  displayWebSites();
  localStorage.setItem("siteData", JSON.stringify(allSites));
}
