function dialog(str) {
    let  dial = '<div class="modal in" id="diabox" style="display: block;">\n' +
        '  <div class="modal-dialog">\n' +
        '    <div class="modal-content">\n' +
        '      <div class="modal-header">\n' +
        '        <h4 class="modal-title">Are you sure???</h4>\n' +
        '      </div>\n' +
        '      <div class="modal-body">\n' +
        '        <p>'+str+'</p>\n' +
        '        <div class="row">\n' +
        '            <div class="col-12-xs text-center">\n' +
        '                <button class="btn btn-success btn-md" onclick="dialogYes()">Yes</button>\n' +
        '                <button class="btn btn-danger btn-md" onclick="dialogNo()">No</button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '      </div>\n' +
        '   \n' +
        '    </div><!-- /.modal-content -->\n' +
        '  </div><!-- /.modal-dialog -->\n' +
        '</div><!-- /.modal -->';

    $('#diag').append(dial);
}

function dialogYes(){

    document.getElementById("diag").innerHTML = "";
}

function dialogNo(){

    document.getElementById("diag").innerHTML = "";
}

function alertDialog(str) {
    let  dial = '<div class="modal in" id="diabox" style="display: block;">\n' +
        '  <div class="modal-dialog">\n' +
        '    <div class="modal-content">\n' +
        '      <div class="modal-header">\n' +
        '        <h4 class="modal-title">Are you sure???</h4>\n' +
        '      </div>\n' +
        '      <div class="modal-body">\n' +
        '        <p>'+str+'</p>\n' +
        '        <div class="row">\n' +
        '            <div class="col-12-xs text-center">\n' +
        '                <button class="btn btn-success btn-md" onclick="dialogNo()">Ok</button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '      </div>\n' +
        '   \n' +
        '    </div><!-- /.modal-content -->\n' +
        '  </div><!-- /.modal-dialog -->\n' +
        '</div><!-- /.modal -->';

    $('#diag').append(dial);
}
