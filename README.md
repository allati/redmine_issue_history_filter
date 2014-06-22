This plugin adds simple filtering capability to the "issue" view of the Redmine project management application.

## Introduction

[Redmine](http://www.redmine.org) issue history block tends to quickly become hard to be used as a quick overview of what happened to the issue over time. This plugin adds dialog with simple filters to hide comments or details you are not interested in to let you quickly skim through issue history for the information you need.

## Features

* Show/hide details in the entries (i.e. changed values of the issue attributes)
* Show/hide comment text in the entries
* Show only entries that contain specific string
* Show only entries that contain modification for the specific issue attribute
* Show only entries from the specific author

## Installation

To install this plugin, execute the following command from the root of your Redmine directory, assuming that your RAILS_ENV environment variable is set to "production":


    git clone https://github.com/allati/redmine_issue_history_filter.git plugins/redmine_issue_history_filter

More information on installing Redmine plugins can be found here: [http://www.redmine.org/wiki/redmine/Plugins](http://www.redmine.org/wiki/redmine/Plugins "Redmine Plugins")

After the plugin is installed, you will need to restart Redmine for the plugin to be available.

## User Guide

Once the Redmine Issue History Filter Plugin is installed, tiny magnifier icon will be displayed next to the "History" title on the issue details page. Initially this icon is transparent, but it will become solid once any of the filters are applied.

Clicking this icon will open dialog with the following fields:

* **Find in comment** - only entries containing this string will be displayed
* **User** - only entries by this user will be displayed
* **Modified attribute** - only entries that contain information about modification of this attribute will be displayed
* **Display changed attributes** - whether or not to display modified issue attributes in the history entries
* **Display comment** - whether or not to display comment text in the history entries

*Note: **User** and  **Modified attribute** fields are populated by the values currently present in the issue history. They may not contain every value possible.*

Filter are applied "as you type". To close the dialog you may hit *esc* key or click magnifier icon again.

### About

Copyright (c) 2014 Vadim Dmitriev, released under the [APL 2.0 license](http://www.apache.org/licenses/LICENSE-2.0.txt).