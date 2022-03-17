/**
 * Oribi
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/
 *
 * @class
 * @extends BaseProvider
 */
class OribiProvider extends BaseProvider
{
    constructor()
    {
        super();
        this._key        = "ORIBIANALYTICS";
        this._pattern    = /https?:\/\/gw\.oribi\.io\/event/;
        this._name       = "Oribi";
        this._type       = "analytics";
        this._keywords   = ["oribi"];
    }
 
    /**
      * Retrieve the column mappings for default columns (account, event type)
      *
      * @return {{}}
      */
    get columnMapping()
    {
        return {
            "account":     "trackingId",
            "requestType": "omnibug_requestType"
        };
    }
 
 
    /**
      * Parse any POST data into param key/value pairs
      *
      * @param postData
      * @return {Array|Object}
      */
    parsePostData(postData = "") {
        let params = [];
        // Handle POST data first, if applicable (treat as query params)
        if (typeof postData === "string" && postData !== "") {
            const postObject = JSON.parse(postData);
            Object.entries(postObject).forEach((entry) => {
                let value = entry[1] || "";
                if(typeof value === "object"){
                    value = JSON.stringify(value);
                }
                params.push([entry[0], value.toString()]);
            });
        }
        return params;
    }
 
    /**
      * Parse custom properties for a given URL
      *
      * @param    {object}   url
      * @param    {object}   params
      *
      * @returns {Array}
      */
    handleCustom(url, params)
    {
        let results = [],
            hitType = params.get("eventType") || "",
            requestType = "";
 
        results.push({
            "key":    "omnibug_hostname",
            "value":  url.hostname,
            "field":   "Oribi Host",
            "group":  "general"
        });
 
        hitType = hitType.toLowerCase();
        requestType = hitType;
        // if(hitType === "pageview" || hitType === "screenview" || hitType === "page_view") {
        //     requestType = "Page View";
        // } else if(hitType === "transaction" || hitType === "item") {
        //     requestType = "Ecommerce " + hitType.charAt(0).toUpperCase() + hitType.slice(1);
        // } else if(hitType.indexOf("_")) {
        //     requestType = hitType.replace(/_/g, " ");
        // } else {
        //     requestType = hitType.charAt(0).toUpperCase() + hitType.slice(1);
        // }
        results.push({
            "key":    "omnibug_requestType",
            "value":  requestType,
            "hidden": true
        });
 
        return results;
    }
}
 