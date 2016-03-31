/* Export as CSV

Created by Ralf Becher - ralf.becher@tiq-solutions.de - TIQ Solutions, Leipzig, Germany

Tested on QV 11.0, 11.2

TIQ Solutions takes no responsbility for any code.
Use at your own risk. */

var template_path_ExportAsCSV = Qva.Remote + "?public=only&name=Extensions/ExportAsCSV/";

function ExportAsCSV_Init() {
    Qva.AddExtension("ExportAsCSV", function () {
        var _this = this;

        if (!_this.ExtensionLoaded) {
            _this.ExtensionLoaded = true;
            _this.delimiter = _this.Layout.Text0.text;
            _this.newline = "\r\n";
        }

        var divName = _this.Layout.ObjectId.replace("\\", "_");

        if (_this.Element.children.length == 0) {
            var ui = document.createElement("div");
            ui.setAttribute("id", divName);
            _this.Element.appendChild(ui);
            var image = document.createElement("img");
            image.setAttribute("src", template_path_ExportAsCSV + "icon.png");
            image.setAttribute("border", 0);
            image.setAttribute("title", "Export as CSV");
            image.setAttribute("alt", "Export as CSV");

            var anchor = document.createElement("a");

            var datastr = "data:text/csv;charset=utf-8,";
            var noCols = _this.Data.HeaderRows[0].length;
            var noRows = _this.Data.Rows.length;
            var encDelimiter = encodeURIComponent(_this.delimiter);
            var encNewline = encodeURIComponent(_this.newline);

            for (var c = 0; c < noCols; c++) {
                datastr += encodeURIComponent(_this.Data.HeaderRows[0][c].text);
                if (c < noCols - 1) {
                    datastr += encDelimiter;
                } else {
                    datastr += encNewline;
                }
            }
            for (var r = 0, noRows; r < noRows; r++) {
                for (var c = 0; c < noCols; c++) {
                    datastr += encodeURIComponent(_this.Data.Rows[r][c].text);
                    if (c < noCols - 1) {
                        datastr += encDelimiter;
                    } else {
                        datastr += encNewline;
                    }
                }
            }
            anchor.setAttribute("href", datastr);
            anchor.setAttribute("download", "Export.csv");
            anchor.setAttribute("target", "_blank");

            anchor.appendChild(image);
            ui.appendChild(anchor);
        }

    }, true);
}
ExportAsCSV_Init();