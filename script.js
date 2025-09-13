const form = document.querySelector("#form");
const formWrapper = document.querySelector(".form-wrapper");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageListWrapper = document.querySelector(".imageList-wrapper");

runEventListener();

function runEventListener(){
    form.addEventListener("submit", search); //submit olursa search adındaki butona git
    clearButton.addEventListener("click",clear);
    
}

function clear(e){
    searchInput.value ="";
    imageListWrapper.innerHTML ="";
}
/*
 NOT1:  Eğer sadece "Ara" butonunun click olayını dinlersek, kullanıcı "Enter" tuşuna bastığında
 arama işlevi çalışmaz. Formun submit olayını dinlemek, hem butona tıklamayı hem de "Enter" tuşuna
basılmasını kapsar, böylece formun tüm "submit" işlemlerini kontrol altına almış oluruz.
Bu, kullanıcı deneyimini daha tutarlı hale getirir, çünkü kullanıcılar genellikle "Enter" tuşuna 
basarak formu göndermek isterler. 

NOT2: e genellikle "event" (olay) kelimesinin kısaltması olarak kullanılır. Bir olay (örneğin, bir butona
tıklama, bir formun gönderilmesi) tetiklendiğinde, JavaScript bu olaya dair bilgileri tutan bir "event" nesnesi 
(yani e) oluşturur. Bu nesne, olay hakkında bilgiler içerir ve olayın nasıl gerçekleştiğini kontrol etmemize izin verir.

NOT3:  Bir form gönderildiğinde (yani "submit" edildiğinde), tarayıcı otomatik olarak sayfayı yeniden yükler ve form
verilerini sunucuya gönderir. Ancak, JavaScript ile bu varsayılan davranışı engellemek isteyebiliriz. Örneğin, formun
yeniden yüklenmesini istemeyip, JavaScript ile verileri işlemek isteyebiliriz.
İşte e.preventDefault() bu noktada devreye girer*/

function search(e){

    imageListWrapper.innerHTML = "";
    
    const value = searchInput.value.trim(); //trim, Stringin baştaki ve sondaki boşlukları kaldırır.
    /*Resimleri almak için https://api.unsplash.com/search/photos?page=1&query=office>*/
    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
      method: "GET",
      headers: {
        Authorization: "Client-ID YOUR_API_KEY_HERE"
      }
    })
    .then((res) =>  res.json()) 
    .then( (data) => {
       
        Array.from(data.results).forEach((image) =>{
            addImageToUI(image.urls.small);
        })
        /* data.results aslında bir dizi (array) değil,object. O yüzden Array.from
        ile bir diziye çevrdik. Ancak Array.from yazmadan da çalışıyor. Bunun nedeni
        bu nesne büyük ihtimalle bir dizi benzeri yapıdır. JavaScript'te diziler dışında
        forEach metodunu destekleyen bazı yapı ve nesneler olabilir.*/
    })
    .catch((err)=> console.log(err));

    /*önceki Fetch orneklerinde fetch içine sadece http bağlantısını yapıp bırakmıştık
    Burada ayrı bir parametre eklememizin sebebi kullanıcıdan veri almamızdır. Bu nedenle
    method ile "GET" yazdık. Eğer kullanıcıdan 1'den fazla kelime alacaksak GET yerine POST yazardık*/
   
    e.preventDefault();
}

function addImageToUI(url){
    const div = document.createElement("div");
    div.className = "card";

    const img = document.createElement("img");
    img.src = url;
    img.height = "400";
    img.width = "400";

    div.appendChild(img);
    imageListWrapper.appendChild(div);
}

/*NOT

.then(function(res) {
    return res.json();
})

Bu kod parçası, .then( (res) => res.json()) ile
aynı işlemi yapar */



