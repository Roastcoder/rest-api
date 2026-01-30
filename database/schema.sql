-- Alter existing users table for security
ALTER TABLE users 
ADD COLUMN last_login TIMESTAMP NULL,
ADD COLUMN failed_login_attempts INT DEFAULT 0,
ADD COLUMN locked_until TIMESTAMP NULL,
ADD COLUMN is_active BOOLEAN DEFAULT TRUE;

-- Alter existing api_keys table
ALTER TABLE api_keys 
ADD COLUMN key_hash VARCHAR(64) UNIQUE,
ADD COLUMN key_prefix VARCHAR(10),
ADD COLUMN permissions JSON,
ADD COLUMN expires_at TIMESTAMP NULL,
ADD COLUMN last_used TIMESTAMP NULL;

-- Alter existing permissions table
ALTER TABLE permissions 
ADD COLUMN resource VARCHAR(50),
ADD COLUMN action VARCHAR(50),
ADD INDEX idx_resource_action (resource, action);

-- role_permissions table already exists

-- Audit logs for compliance
CREATE TABLE audit_logs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NULL,
  api_key_id INT NULL,
  method VARCHAR(10) NOT NULL,
  url VARCHAR(500) NOT NULL,
  ip VARCHAR(45) NOT NULL,
  user_agent TEXT,
  status_code INT NOT NULL,
  response_time INT NOT NULL,
  request_body JSON NULL,
  response_body JSON NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (api_key_id) REFERENCES api_keys(id),
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at),
  INDEX idx_method_url (method, url(100))
);

-- Insert default roles (if not exists)
INSERT IGNORE INTO roles (name, display_name, description) VALUES
('admin', 'Administrator', 'Full system access'),
('manager', 'Manager', 'Management level access'),
('advisor', 'Advisor', 'Advisory level access'),
('channel_partner', 'Channel Partner', 'Channel partner access');

-- Insert default permissions (if not exists)
INSERT IGNORE INTO permissions (name, display_name, category, description, resource, action) VALUES
('users.read', 'View Users', 'Users', 'View users', 'users', 'read'),
('users.write', 'Manage Users', 'Users', 'Create/update users', 'users', 'write'),
('leads.read', 'View Leads', 'Leads', 'View leads', 'leads', 'read'),
('leads.write', 'Manage Leads', 'Leads', 'Create/update leads', 'leads', 'write'),
('payouts.read', 'View Payouts', 'Payouts', 'View payouts', 'payouts', 'read'),
('payouts.write', 'Process Payouts', 'Payouts', 'Process payouts', 'payouts', 'write'),
('kyc.read', 'View KYC', 'KYC', 'View KYC data', 'kyc', 'read'),
('kyc.write', 'Process KYC', 'KYC', 'Process KYC', 'kyc', 'write');