import React, { Component } from 'react';
import { View, Text ,TouchableOpacity} from 'react-native';
import { Ionicons,MaterialIcons,FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

export default class SozlesmeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <ScrollView style={{flex:1}} contentContainerStyle={{justifyContent:'center',alignItems:'center',backgroundColor:'#ecf0f1',}}>
            <TouchableOpacity onPress={()=>this.props.navigation.goBack(null)} style={{position:'absolute',top:50,left:20,justifyContent:'center',alignItems:'center',zIndex:5}}><Ionicons name="ios-arrow-back" size={35} color="black" /></TouchableOpacity>
            <Text style={{color:'#555555',fontWeight:'bold',fontSize:20,textAlign:'center',marginTop:100}}> Kullanıcı Sözleşmesi </Text>
            <Text style={{color:'gray',fontWeight:'bold',fontSize:18,marginTop:20,width:'90%'}}>
                
            UYGULAMA KULLANIM ŞARTLARI

            Bu mobil uygulamayı (Kısaca "uygulama" olarak anılacaktır.) kullanmak için lütfen aşağıda yazılı koşulları okuyunuz. Bu uygulamada sunulan hizmetlerden yararlananlar veya herhangi bir şekilde uygulama 'ya erişim sağlayan her gerçek ve tüzel kişi aşağıdaki kullanım koşullarını kabul etmiş sayılmaktadır.

            Lütfen uygulamamızı kullanmadan evvel bu ‘uygulama kullanım şartlarını dikkatlice okuyunuz. 
            Bu mobil uygulamayı kullanan kullanıcılarımız aşağıdaki şartları kabul etmiş varsayılmaktadır:

            Bu UYGULAMA’da sunulan hizmetler Appnet Yazılım Bilişim Sistemleri Tic. Ltd. Şti. (bundan böyle kısaca "APPNET" olarak anılacaktır) tarafından sağlanmaktadır ve UYGULAma’nın yasal sahibi APPNET olup, Uygulama üzerında her türlü kullanım ve tasarruf yetkisi APPNET’e aittir.  İşbu kullanım koşullarını APPNET gerektiği zaman değiştirebilir; ancak bu değişiklikler düzenli olarak UYGULAMA’da yayınlanacak ve aynı tarihten itibaren geçerli olacaktır.
            KULLANICI: APPNET mobil uygulamasını alışveriş yaparak ya da alışveriş yapmaksızın ziyaret eden kişidir.  LİNK: Uygulama üzerinden bir başka mobil uygulamasına, dosyalara, içeriğe veya başka bir web uygulamasından UYGULAMA’ya, dosyalara ve içeriğe erişimi mümkün kılan bağlantıdır.  İÇERİK: UYGULAMA’da ve/veya herhangi bir mobil uygulamasında yayınlanan veya erişimi mümkün olan her türlü bilgi, dosya, resim, program, rakam, fiyat, vs. görsel, yazınsal ve işitsel imgelerdir.   MOBİL UYGULAMA KULLANIM KOŞULLARI VE ÜYELİK SÖZLEŞMESİ: Uygulama vasıtasıyla sunulmakta olan ticari ve kişiye özel nitelikteki hizmetlerden yararlanacak gerçek ve/veya tüzel kişilerle APPNET arasında elektronik ortamda akdedilen işbu sözleşmedir.  KİŞİSEL BİLGİ: Üyenin kimliği, adresi, elektronik posta adresi, telefon numarası, IP adresi, UYGULAma’nın hangi bölümlerini ziyaret ettiği, domain tipi, browser tipi, ziyaret tarihi, saati, vs. bilgilerdir.


            Uygulamamızdaki sayfalar ve ona bağlı tüm bağlantılar (‘uygulama’)  www.appnet.team/ adresindeki APPNET firmasının (Firma) malıdır ve onun tarafından işletilir. Sizler (‘Kullanıcı’) uygulamada sunulan tüm hizmetleri kullanırken aşağıdaki şartlara tabi olduğunuzu, uygulamadaki hizmetten yararlanmakla ve kullanmaya devam etmekle; Bağlı olduğunuz yasalara göre sözleşme imzalama hakkına, yetkisine ve hukuki ehliyetine sahip ve 18 yaşın üzerinde olduğunuzu, bu sözleşmeyi okuduğunuzu, anladığınızı ve sözleşmede yazan şartlarla bağlı olduğunuzu kabul etmiş sayılırsınız. 

            İşbu sözleşme taraflara sözleşme konusu uygulama ile ilgili hak ve yükümlülükler yükler ve taraflar işbu sözleşmeyi kabul ettiklerinde bahsi geçen hak ve yükümlülükleri eksiksiz, doğru, zamanında, işbu sözleşmede talep edilen şartlar dâhilinde yerine getireceklerini beyan ederler.

            1. SORUMLULUKLAR
            a. Firma, fiyatlar ve sunulan ürün ve hizmetler üzerinde değişiklik yapma hakkını her zaman saklı tutar. 
            b. Firma, üyenin sözleşme konusu hizmetlerden, teknik arızalar dışında yararlandırılacağını kabul ve taahhüt eder.
            c. Kullanıcı, uygulamanın kullanımında tersine mühendislik yapmayacağını ya da bunların kaynak kodunu bulmak veya elde etmek amacına yönelik herhangi bir başka işlemde bulunmayacağını aksi halde ve 3. Kişiler nezdinde doğacak zararlardan sorumlu olacağını, hakkında hukuki ve cezai işlem yapılacağını peşinen kabul eder. 
            d. Kullanıcı, uygulama içindeki faaliyetlerinde, uygulamanın herhangi bir bölümünde veya iletişimlerinde genel ahlaka ve adaba aykırı, kanuna aykırı, 3. Kişilerin haklarını zedeleyen, yanıltıcı, saldırgan, müstehcen, pornografik, kişilik haklarını zedeleyen, telif haklarına aykırı, yasa dışı faaliyetleri teşvik eden içerikler üretmeyeceğini, paylaşmayacağını kabul eder. Aksi halde oluşacak zarardan tamamen kendisi sorumludur ve bu durumda ‘Uygulama’ yetkilileri, bu tür hesapları askıya alabilir, sona erdirebilir, yasal süreç başlatma hakkını saklı tutar. Bu sebeple yargı mercilerinden etkinlik veya kullanıcı hesapları ile ilgili bilgi talepleri gelirse paylaşma hakkını saklı tutar.
            e. Uygulamanın üyelerinin birbirleri veya üçüncü şahıslarla olan ilişkileri kendi sorumluluğundadır. 

            f. Üyenin, Üye Profil Sayfasına erişmek ve Uygulama üzerinde bazı işlemleri gerçekleştirebilmek için ihtiyaç duyduğu kullanıcı adı ve şifre bilgisi, Üye tarafından oluşturulmakta olup, söz konusu bilgilerin güvenliği ve gizliliği tamamen Üye’nin sorumluluğundadır.

            Yazılım: Tamamının APPNET ve/veya anlaşmalı üçüncü kişi servis sağlayıcıları tarafından geliştirildiği ve/veya ilgili alt yazılım lisanslarının ve bu alt yazılım lisansları ile ilgili tüm Haklarının APPNET tarafından alınmış olduğu, Uygulama'da Hizmet'in verilmesi amacıyla kullanılan, üzerindeki tüm Hakların APPNET ’in mülkiyetinde olduğu ve/veya lisans sahibi olduğu arayüz ve bilgisayar programları bütünüdür. İşbu Sözleşme kapsamında, Yazılım ve APPNET ’in Yazılım üzerindeki tüm Hakları, aksi açıkça belirtilmedikçe ve/veya ilgili yasalarca kısıtlanmadıkça, en kapsamlı haliyle yorumlanacaktır.


            2.  Fikri Mülkiyet Hakları

            2.1. İşbu Uygulama’da yer alan ünvan, işletme adı, marka, patent, logo, tasarım, bilgi ve yöntem gibi tescilli veya tescilsiz tüm fikri mülkiyet hakları uygulama işleteni ve sahibi firmaya veya belirtilen ilgilisine ait olup, ulusal ve uluslararası hukukun koruması altındadır. İşbu Uygulama’nın ziyaret edilmesi veya bu Uygulama’daki hizmetlerden yararlanılması söz konusu fikri mülkiyet hakları konusunda hiçbir hak vermez.
            2.2. Uygulama’da yer alan bilgiler hiçbir şekilde çoğaltılamaz, yayınlanamaz, kopyalanamaz, sunulamaz ve/veya aktarılamaz. Uygulama’nın bütünü veya bir kısmı diğer bir internet uygulamasında izinsiz olarak kullanılamaz. 

            İçerik
            5.2.1 Üye ve Kullanıcı, APPNET ’in Uygulama’da yer alan her türlü, bilginin, içeriğin ve görselin gerçekliğini, orijinalliğini, güvenliğini, doğruluğunu araştırma, bu içerik ve ilanların internet üzerinden teşhirinin hukuka uygun olup olmadığını tespit etme sorumluluğu bulunmadığını, söz konusu İçerikler sebebiyle ortaya çıkabilecek zararlardan dolayı APPNET ’in, APPNET  çalışanlarının ve yöneticilerinin sorumluluğu bulunmadığını kabul ve beyan eder. Üye ve Kullanıcı APPNET ’in kontrolünde olmayan başka internet uygulamalarına ve/veya portallara, dosyalara veya içeriklere link verilebileceğini, bu linkin yöneldiği internet uygulaması veya içerdiği bilgilere yönelik herhangi bir türde bir beyan veya garanti niteliği taşımadığını, söz konusu linkler vasıtasıyla erişilen portallar, internet uygulamaları, dosyalar ve içerikler, hizmetler veya ürünler ve bunların içeriği, gizlilik politikaları hakkında APPNET ’in herhangi bir sorumluluğu olmadığını kabul ve beyan eder.
            5.2.11 APPNET , Üye'ye bildirmeksizin ve Üye’nin yazılı veya sözlü onayını almaksızın, işbu 5. madde kapsamındaki İçerik'i değiştirebilir, eklemelerde bulunabilir, modifikasyon yapabilir, kısaltabilir, ayrıştırabilir, çoğaltabilir, kopyalayabilir, saklayabilir, işleyebilir, formatını değiştirebilir, üzerinde oynayabilir, diğer İçerik ile birleştirebilir ve bunlarla kısıtlı olmamak üzere diğer benzeri tasarruflarda bulunabilir.
            5.2.12 APPNET , Üye'ler tarafından gönderilen İçerik'in, İçerik olarak kabulünü ve Uygulama'da İçerik olarak kısmi ve/veya tamamen saklanması, görülebilir hale getirilmesi, sunulması ve paylaşılması garantisini vermez. APPNET ’in Üye'nin verdiği İçerik'i yaratıldığı halde (orijinal halde) saklama, paylaşma ve sunma zorunluluğu bulunmamaktadır. APPNET  işbu madde kapsamındaki İçerik'i başta diğer Üyeler olmak üzere ve bunlarla kısıtlı olmamak kaydıyla, genele sunabilir, umuma arz edebilir, tüzel kişiler de dahil olmak üzere diğer üçüncü kişilere yayabilir, isteği şekilde ücretli veya ücretsiz, şartları tamamen APPNET ’in belirlediği şekilde, üçüncü şahıslara kullandırabilir ve faydalandırabilir. APPNET , işbu madde konusu Haklar'ın hepsini veya bir kısmını devredebilir, alt lisanslama yoluyla dağıtabilir, paylaşabilir, arz edebilir, pazarlayabilir, satabilir, reklam ve sair amaçlarla kullanabilir, kullandırabilir, faydalanabilir ve faydalandırabilir.
            Uygulama’ya üye olmak ücretsizdir. Ancak, ileride Hizmet'in bir kısmının veya hepsinin Üye'ye kısmen veya tamamen ücretli sunulması ve/veya ücretli Üyelik yoluyla Üye'den ücret alınması durumlarında işbu Üye'nin Uygulama’ya konulmak üzere APPNET ’a verdiği İçerik maddesi kapsamında herhangi bir değişiklik yapılmayacaktır. Açıkça, Üye'nin herhangi bir durumda, APPNET ’a ücret ödemesi, APPNET ’in Üye'nin Uygulama’ya konulmak üzere APPNET ’a verdiği İçerik kapsamındaki elde ettiği Haklar konusunda APPNET ’a herhangi bir kısıtlama ve/veya bedel ödeme yükümlülüğü getirmeyecektir. Üye, Uygulama’ya Üye olması ile Hizmet'ten faydalanmaya başlamış olması nedeniyle, Üye'nin Uygulama’ya konulmak üzere APPNET ’a verdiği İçerik ile ilgili herhangi olası bir cayma hakkının kalmadığını peşinen ve gayrikabili rücu olmak üzere kabul, beyan ve taahhüt eder.

            3. Gizli Bilgi
            3.1. Firma, uygulama üzerinden kullanıcıların ilettiği kişisel bilgileri 3. Kişilere açıklamayacaktır. Bu kişisel bilgiler; kişi adı-soyadı, adresi, telefon numarası, cep telefonu, e-posta adresi gibi Kullanıcı’yı tanımlamaya yönelik her türlü diğer bilgiyi içermekte olup, kısaca ‘Gizli Bilgiler’ olarak anılacaktır.

            3.2. Kullanıcı, sadece tanıtım, reklam, kampanya, promosyon, duyuru vb. pazarlama faaliyetleri kapsamında kullanılması ile sınırlı olmak üzere, Uygulama’nın sahibi olan firmanın kendisine ait iletişim, portföy durumu ve demografik bilgilerini iştirakleri ya da bağlı bulunduğu grup şirketleri ile paylaşmasına muvafakat ettiğini kabul ve beyan eder. Bu kişisel bilgiler firma bünyesinde müşteri profili belirlemek, müşteri profiline uygun promosyon ve kampanyalar sunmak ve istatistiksel çalışmalar yapmak amacıyla kullanılabilecektir.

            3.3. Gizli Bilgiler, ancak resmi makamlarca usulü dairesinde bu bilgilerin talep edilmesi halında ve yürürlükteki emredici mevzuat hükümleri gereğince resmi makamlara açıklama yapılmasının zorunlu olduğu durumlarda resmi makamlara açıklanabilecektir.

            4. Garanti Vermeme: İŞBU SÖZLEŞME MADDESİ UYGULANABİLİR KANUNUN İZİN VERDİĞİ AZAMİ ÖLÇÜDE GEÇERLİ OLACAKTIR. FİRMA TARAFINDAN SUNULAN HİZMETLER "OLDUĞU GİBİ” VE "MÜMKÜN OLDUĞU” TEMELDE SUNULMAKTA VE PAZARLANABİLİRLİK, BELİRLİ BİR AMACA UYGUNLUK VEYA İHLAL ETMEME KONUSUNDA TÜM ZIMNİ GARANTİLER DE DÂHİL OLMAK ÜZERE HİZMETLER VEYA UYGULAMA İLE İLGİLİ OLARAK (BUNLARDA YER ALAN TÜM BİLGİLER DÂHİL) SARİH VEYA ZIMNİ, KANUNİ VEYA BAŞKA BİR NİTELİKTE HİÇBİR GARANTİDE BULUNMAMAKTADIR. 

            5. Kayıt ve Güvenlik 
            Kullanıcı, doğru, eksiksiz ve güncel kayıt bilgilerini vermek zorundadır. Aksi halde bu Sözleşme ihlal edilmiş sayılacak ve Kullanıcı bilgilendirilmeksizin hesap kapatılabilecektir.
            Kullanıcı, uygulama ve üçüncü taraf uygulamalardaki şifre ve hesap güvenliğinden kendisi sorumludur. Aksi halde oluşacak veri kayıplarından ve güvenlik ihlallerinden veya donanım ve cihazların zarar görmesinden Firma sorumlu tutulamaz.

            6. Mücbir Sebep

            Tarafların kontrolünde olmayan; tabii afetler, yangın, patlamalar, iç savaşlar, savaşlar, ayaklanmalar, halk hareketleri, seferberlik ilanı, grev, lokavt ve salgın hastalıklar, altyapı ve internet arızaları, elektrik kesintisi gibi sebeplerden (aşağıda birlikte "Mücbir Sebep” olarak anılacaktır.) dolayı sözleşmeden doğan yükümlülükler taraflarca ifa edilemez hale gelirse, taraflar bundan sorumlu değildir. Bu sürede Taraflar’ın işbu Sözleşme’den doğan hak ve yükümlülükleri askıya alınır. 

            7. Sözleşmenin Bütünlüğü ve Uygulanabilirlik

            İşbu sözleşme şartlarından biri, kısmen veya tamamen geçersiz hale gelirse, sözleşmenin geri kalanı geçerliliğini korumaya devam eder.
            8. Teknik Problemler
            8.1 Özellikle yargı ve sair yetkili resmi merci karar, direktif, emir ve uygulamaları, sair mücbir sebepler (örneğin doğal afet, terörist saldırıları, yangın, sel, zelzele, grev, lokavt vb.), üçüncü kişilerin sebep olduğu durumlar, internet bağlantı hizmeti sağlayan kurum ve/veya kuruluşlardan kaynaklanan uzun süreli veya kısa süreli aksaklıklar, eksiklikler, teknik arızalar ve/veya gecikmeler ve benzeri dış etkenler, yanlış ve hatalı kullanım, APPNET ’tan kaynaklanabilecek uzun süreli veya kısa süreli teknik arıza ve sair aksaklıklar, eksiklikler, gecikmeler, bozukluklar, tamir çalışmaları veya diğer yönlendirmeler sonucu meydana gelen sair bütün problemler de dâhil olmak üzere internet servis sağlayıcılardan kaynaklanan geçici dahi olsa hizmet kesintilerinden, aksaklıklardan, arızalardan,  diğer her türlü teknik zorunluluklardan, bakım veya yenileme işlemlerinden, telefon şebekesinden, GSM operatöründen, altyapı sağlayıcısından ve elektrik kesintilerinden dolayı Hizmet'in verilmesinde yaşanabilecek aksaklıklardan ve problemlerden APPNET  hiçbir surette sorumlu tutulamaz. Olası kesintiler veya başka bir sebeple Üye'lerin iletişiminde, Hizmet'in sağlanmasında, Yazılım'ın çalışmasında ve/veya İçerik'te oluşabilecek değişiklik, eksiklik, aksama, kopukluk, kesinti, yanlışlık, silinme ve bozulmalar da dahil olmak üzere ve bunlarla sınırlı olmamak kaydıyla APPNET  yaşanabilecek hiçbir problemden sorumlu değildir.
             
            8.2 APPNET  gerektiğinde ve kendi takdir yetkisine bağlı olarak ağın işletim güvenliğinin tehlikede olması, ağa erişimin devamlılığı ve sürekliliği, ağda, yazılımda veya kayıtlı dosyalarda meydana gelebilecek arızaların, bozulmaların, eksikliklerin ve sair her türlü problemin önüne geçebilmek, muhtemel bütün aksaklıkları engellemek ve/veya etkisini azaltmak adına ve gerekli gördüğü diğer durumlarda hizmete erişimi süreli veya süresiz, kısmen veya tamamen sınırlandırabilir veya durdurabilir.
            10. Üçüncü Şahıslara Verilen Zararlar
            Üye, APPNET  tarafından sunulan Hizmet'in kullanımı sırasında gerçek veya tüzel üçüncü kişilere zarar vermesi ve/veya bu kişilere karşı hukuka aykırı bir fiil işlemesi halında, söz konusu zarardan ve/veya hukuka aykırı fiilden bizzat sorumlu olduğunu ve APPNET ’in tamamen sorumsuz olduğunu gayrikabili rücu olmak üzere kabul, beyan ve taahhüt eder. Üçüncü şahıslarla ilgili olarak ortaya çıkabilecek ihtilaflarda; üçüncü şahısların her türlü tazminat taleplerinde APPNET ’in herhangi bir şekilde sorumlu tutulamayacağını, tutulması halında de APPNET ’in katlanmak zorunda kalacağı her türlü zarar ve masrafı APPNET ’in söz konusu zarar ve masrafın karşılanmasına ilişkin Üye’ye göndereceği yazılı talepten sonra ivedilikle karşılayacağını Üye gayrikabili rücu olmak üzere peşinen kabul, beyan ve taahhüt eder.

            14. Yazılım
            14.1 Yazılım'ın her türlü Haklar'ının sahibi APPNET  ve/veya APPNET ’in anlaşmalı olduğu üçüncü kişi servis sağlayıcılardır. APPNET  önceden haber vermeksizin Yazılım üzerinde her türlü tasarrufta bulunma yetkisini haizdir. Yazılım'dan veya Yazılım'ın herhangi bir şekilde çalışmamasından, eksik çalışmasından, geçici veya sürekli surette aksaklık çıkarmasından veya yeterli veya tam manasıyla randıman alınamamasından APPNET  herhangi bir surette sorumlu tutulamaz. APPNET , Hizmet ile ilgili herhangi bir garanti vermediği gibi, Yazılım'la da ilgili herhangi bir garanti de vermemektedir.
             
            14.2 Yazılım'ın bir kısmı veya tamamı, herhangi bir nedenle, APPNET ’in önceden açık yazılı izni olmaksızın kopyalanamaz, çoğaltılamaz, yüklenemez, geliştirilemez, kısmen veya tamamen değiştirilemez, başka gerçek ve/veya tüzel üçüncü kişilere devredilemez, herhangi başka bir şekilde oluşturulamaz, pazarlanamaz, satılamaz, kullandırılmaz ve kullanılamaz. Yazılım'ın, APPNET ’in önceden açık yazılı izni olmaksızın herhangi bir amaç için kullanılması yasaktır. Üye, Uygulama'da Yazılım’ı sadece işbu Sözleşme'deki şartlara bağlı olmak koşuluyla sadece Hizmet alma amacı ile sınırlı ve süreli olarak kullanacağını peşinen kabul, beyan ve taahhüt eder.
             

            8. Sözleşmede Yapılacak Değişiklikler

            Firma, dilediği zaman uygulamada sunulan hizmetleri ve işbu sözleşme şartlarını kısmen veya tamamen değiştirebilir. Değişiklikler uygulamada yayınlandığı tarihten itibaren geçerli olacaktır. Değişiklikleri takip etmek Kullanıcı’nın sorumluluğundadır. Kullanıcı, sunulan hizmetlerden yararlanmaya devam etmekle bu değişiklikleri de kabul etmiş sayılır.

            9. Tebligat
            İşbu Sözleşme ile ilgili taraflara gönderilecek olan tüm bildirimler, Firma’nın bilinen e.posta adresi ve kullanıcının üyelik formunda belirttiği e.posta adresi vasıtasıyla yapılacaktır. Kullanıcı, üye olurken belirttiği adresin geçerli tebligat adresi olduğunu, değişmesi durumunda 5 gün içında yazılı olarak diğer tarafa bildireceğini, aksi halde bu adrese yapılacak tebligatların geçerli sayılacağını kabul eder.

            10. Delil Sözleşmesi
            Taraflar arasında işbu sözleşme ile ilgili işlemler için çıkabilecek her türlü uyuşmazlıklarda Taraflar’ın defter, kayıt ve belgeleri ile ve bilgisayar kayıtları ve faks kayıtları 6100 sayılı Hukuk Muhakemeleri Kanunu uyarınca delil olarak kabul edilecek olup, kullanıcı bu kayıtlara itiraz etmeyeceğini kabul eder.

            11. Uyuşmazlıkların Çözümü
            İşbu Sözleşme’nin uygulanmasından veya yorumlanmasından doğacak her türlü uyuşmazlığın çözümünde İstanbul (Merkez) Adliyesi Mahkemeleri ve İcra Daireleri yetkilidir.
                
             </Text>
        </ScrollView>
    );
  }
}