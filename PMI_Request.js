var request = require("request");
const cheerio = require('cheerio'); // Lib untuk scraping html atau manipulasi DOM seperti jQuery.

var options = { 
  method: 'POST',
  url: 'http://ayodonor.pmi.or.id/form.php',
  headers: 
   { 'content-type': 'application/x-www-form-urlencoded' },
  form: { gol: 'a_pos', produk: 'AHF', provinsi: 'DKI Jakarta' } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  var $ = cheerio.load(body);
  var hasil = [];
  $('.table-striped.table-bordered.table-hover tr').each(function(a, b) {
   		if( a != 0 ){
   			hasil.push({ 
   				UTD: $(this).find('th:nth-child(2n)').text(),
   				Jumlah: $(this).find('th:nth-child(4n)').text()
   			});
   		}
  });	
  console.log(hasil);
});