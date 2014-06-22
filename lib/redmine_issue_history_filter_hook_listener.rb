class RedmineIssueHistoryFilterHookListener < Redmine::Hook::ViewListener
	render_on :view_issues_form_details_bottom, :partial => "redmine_issue_history_filter/redmine_issue_history_filter_partial"
end