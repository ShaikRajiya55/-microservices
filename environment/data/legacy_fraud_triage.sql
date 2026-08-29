-- Legacy Fraud Triage Model Schema & Seed Rows

CREATE TABLE model_metadata (
    key TEXT PRIMARY KEY,
    value TEXT
);

INSERT INTO model_metadata (key, value) VALUES
('model_id', 'fraud_triage_v2'),
('intercept', '-1.50'),
('score_threshold', '0.60'),
('version', '2026.08');

CREATE TABLE numeric_features (
    feature_name TEXT PRIMARY KEY,
    mean REAL NOT NULL,
    std REAL NOT NULL,
    weight REAL NOT NULL,
    default_value REAL NOT NULL
);

INSERT INTO numeric_features (feature_name, mean, std, weight, default_value) VALUES
('amount', 120.0, 40.0, 0.80, 120.0),
('account_age_days', 300.0, 150.0, -0.50, 300.0),
('failed_logins_24h', 0.4, 1.0, 1.20, 0.0);

CREATE TABLE categorical_vocabularies (
    feature_name TEXT NOT NULL,
    category_value TEXT NOT NULL,
    weight REAL NOT NULL,
    PRIMARY KEY (feature_name, category_value)
);

INSERT INTO categorical_vocabularies (feature_name, category_value, weight) VALUES
('device_type', 'mobile', 0.15),
('device_type', 'desktop', -0.10),
('device_type', 'bot_emulator', 2.50),
('country_code', 'US', -0.25),
('country_code', 'CA', -0.15),
('country_code', 'HIGH_RISK_ZONE', 1.80),
('payment_method', 'credit_card', 0.05),
('payment_method', 'crypto', 1.60),
('payment_method', 'wire_transfer', 0.95);

CREATE TABLE categorical_defaults (
    feature_name TEXT PRIMARY KEY,
    default_weight REAL NOT NULL
);

INSERT INTO categorical_defaults (feature_name, default_weight) VALUES
('device_type', 0.0),
('country_code', 0.50),
('payment_method', 0.20);
