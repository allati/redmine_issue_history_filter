require_dependency 'redmine_issue_history_filter_hook_listener'

Redmine::Plugin.register :redmine_issue_history_filter do
  name 'Issue History Filter Plugin'
  author 'Vadim Dmitriev'
  description 'This plugin provides simple filters for the issue history block'
  version '0.0.1'
  url 'https://github.com/allati/redmine_issue_history_filter'
end
