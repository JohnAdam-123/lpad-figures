const filtersEl = document.querySelector("#filters");
const galleryEl = document.querySelector("#gallery");
const statusEl = document.querySelector("#status");
const dialog = document.querySelector("#lightbox");
const stage = document.querySelector("#lightbox-stage");
const captionEl = document.querySelector("#lightbox-caption");

let items = [];

function showStatus(message) {
  statusEl.hidden = false;
  statusEl.textContent = message;
}

function renderFilters(groups) {
  const buttons = [{ id: "all", label: "All" }, ...groups];
  filtersEl.replaceChildren();
  for (const group of buttons) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = group.label;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", group.id === "all" ? "true" : "false");
    button.addEventListener("click", () => {
      for (const other of filtersEl.querySelectorAll("button")) {
        other.setAttribute("aria-selected", other === button ? "true" : "false");
      }
      renderGallery(group.id);
    });
    filtersEl.append(button);
  }
}

function mediaElement(item) {
  if (item.kind === "video") {
    const video = document.createElement("video");
    video.src = item.src;
    video.controls = true;
    video.preload = "metadata";
    video.playsInline = true;
    return video;
  }
  const image = document.createElement("img");
  image.src = item.src;
  image.alt = item.title;
  return image;
}

function openItem(item) {
  stage.replaceChildren(mediaElement(item));
  captionEl.textContent = `${item.title}. ${item.caption}`;
  dialog.showModal();
}

function renderGallery(groupId) {
  const visible = groupId === "all" ? items : items.filter((item) => item.group === groupId);
  galleryEl.replaceChildren();
  if (visible.length === 0) {
    showStatus("No figures in this group yet.");
    return;
  }
  statusEl.hidden = true;
  for (const item of visible) {
    const card = document.createElement("figure");
    card.className = "card";

    const preview = document.createElement("button");
    preview.className = "preview";
    preview.type = "button";
    preview.append(mediaElement(item));
    preview.addEventListener("click", () => openItem(item));

    const caption = document.createElement("figcaption");
    const title = document.createElement("h3");
    title.textContent = item.title;
    const text = document.createElement("p");
    text.textContent = item.caption;
    caption.append(title, text);
    card.append(preview, caption);
    galleryEl.append(card);
  }
}

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

fetch("gallery.json")
  .then((response) => {
    if (!response.ok) throw new Error("Could not load gallery.json");
    return response.json();
  })
  .then((data) => {
    items = data.items || [];
    renderFilters(data.groups || []);
    renderGallery("all");
  })
  .catch(() => {
    showStatus("The figure list could not be loaded.");
  });
