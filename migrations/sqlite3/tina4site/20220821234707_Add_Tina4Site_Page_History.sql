CREATE TABLE tina4site_page_history (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    cms_page_id  INTEGER references tina4site_page(id) ON DELETE CASCADE,
    html         TEXT NULLABLE,
    pages        TEXT NULLABLE,
    assets       TEXT NULLABLE,
    styles       TEXT NULLABLE,
    note        VARCHAR(1000),
    system_note VARCHAR(1000),
    revision_no  INTEGER,
    created_at DateTime CURRENT_TIMESTAMP
)
