# Navigation
This visualization is used to dynamically show dashboard links within dashboards to facilitate better navigation.
Features Include:
- Filter Dashboards by Prefix (Case Sensitive: lowercase only).
- Truncating first few characters in Dashboard Names using a delimiter.
- Sorting Links based on Dashboard title (Even if you use Description for Hyperlinks).
- Upper limit for number of links to show.
- Using Description rather than Dashboard name for Hyperlinks.
- Highlights Current dashboard if it's in the list.
- Works well with X-Pack or other Security Plugins with limited dashboard access.

## [Kibana](https://www.elastic.co/downloads/past-releases/kibana-6-2-2 "Kibana")

# Build
To build the plugin on your local, run :
```
npm install
npm run build
```
Fill in the kibana version upon prompt.
Then install the plugin via :-
```
./bin/kibana-plugin install file:///path/to/navigation/build/navigation-x.x.x.zip
```