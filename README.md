# Supplementary visualizations

Public project page for figures, short clips, and held-out numbers.
The page does not list authors, affiliations, or contact details.

The Pages address is `https://<github-username>.github.io/lpad-supplement/` once the first build finishes.

Search engines are asked not to index the site (`robots.txt` and a `noindex` tag).
Remove both after the paper is public if you want the page to be findable.

## Add a figure or clip

1. Copy a `.png`, `.svg`, `.jpg`, `.webp`, or `.mp4` into `media/`.
2. Add an object to the `items` array in `gallery.json`.

```json
{
  "src": "media/your_file.png",
  "kind": "image",
  "group": "locomotion",
  "title": "Short title",
  "caption": "What the reader should take from the figure. Say what is a label and what is a detector output."
}
```

Use `"kind": "video"` for an `.mp4`. To add a new filter chip, append a group:

```json
{ "id": "talks", "label": "Talks" }
```

3. Commit and push to `main`. GitHub Pages republishes from the repository root. The update usually appears within a minute.

Keep new plots consistent with the held-out table on the page. Early synthetic runs that score near 1.0 are not the paper result and are not on this site.

## Anonymity

The page text is anonymous. The web address still contains the GitHub username that owns this repository, and the commit history names that account.

For a double-blind submission, do not cite that address. Create a GitHub account whose username is not a person's name, transfer this repository to it, and cite the new Pages address.

```bash
gh repo transfer OWNER/lpad-supplement NEW_ACCOUNT --accept-new-owner-transfers
```

Accept the transfer from the new account, then turn Pages back on if GitHub does not keep the setting. The new address is `https://NEW_ACCOUNT.github.io/lpad-supplement/`.

After acceptance, you can add names on the page and delete `robots.txt` plus the `noindex` tag in `index.html`.
