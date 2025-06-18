import { viProducts, enProducts } from './service.js';
import { viFilteringProcess, enFilteringProcess } from './service.js';

const productString = `<div class="product">
        <div class="main-content">
            <div class="body">
                <div class="images">
                    <img src="" class="product-img-1"
                        alt="">
                </div>
                <div class="content">
                    <h2 class="heading"></h2>
                    <p class="desc line-clamp"></p>
                    <button class="btn btn-primary">Chi tiết</button>
                </div>
            </div>
        </div>
    </div>`;

const modalString = `<div class="body">
            <div class="information">
                <div class="left-info">
                    <div class="frame">
                        <div class="modal-images">
                        </div>
                    </div>

                    <div class="prev" style="display: none;"><i class="fas fa-chevron-left"></i></div>
                    <div class="next"><i class="fas fa-chevron-right"></i></div>
                </div>
                <div class="detail right-info">
                    <h3 class="product-name"></h3>
                    <h5 class="title" data-translate="product-specifications-title">Thông số kỹ thuật:</h5>
                    <div class="specification">
                        <div class="left">
                            <ul>
                                <li><span data-translate="weight">Trọng lượng:</span><span class="weight"></span></li>
                                <li><span data-translate="size"> Kích thước:</span><span class="size"></span> </li>
                                <li><span data-translate="door">Cửa:</span><span class="door"></span></li>
                                <li><span data-translate="capacity">Dung tích bình nước: </span><span class="capacity"></span></li>
                                <li><span data-translate="customer-tank-capacity">Dung tích bình chứa của khách hàng:</span><span class="customer-tank-capacity"></span></li>
                            </ul>
                        </div>
                        <div class="right">
                            <ul>
                                <li><span data-translate="operating-temperature">Nhiệt độ hoạt động: </span><span class="operating-temperature"></span></li>
                                <li><span data-translate="voltage">Điện áp: </span><span class="voltage"></span></li>
                                <li><span data-translate="power-consumption">Công suất tiêu thụ: </span><span class="power-consumption"></span></li>
                                <li><span data-translate="water-filtration-rate">Tốc độ lọc nước: </span><span class="water-filtration-rate"></span></li>
                                <li><span data-translate="water-supply-rate">Tốc độ cấp nước: </span><span class="water-supply-rate"></span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content">
                <h2 class="title" data-translate="product-details-title">Thông tin chi tiết về Sản phẩm</h2>
                <h3 class="product-name"></h3>
                <p class="desc"></p>
                <h5 class="sub-title" data-translate="product-features-title">Đặc điểm nổi bật:</h5>
            </div>
            <div class="process">
                <h5 class="title" data-translate="filtering-process-title">Quy trình 8 bước lọc nước:</h5>
                <ul class="steps"></ul>
            </div>
            <div class="close">
                <i class="fas fa-times-circle icon-close"></i>
            </div>
        </div>`


let currentLang = localStorage.getItem("language") || "vi";
console.log(currentLang);


function setTextContentDesc(parentElement, classDesc, contentArr) {
    const headingElement = parentElement.querySelector(classDesc);
    if (!headingElement) return;
    let desc = '';
    for (let i = 0; i < 4; i++) {
        desc = desc + contentArr[i];
    }
    headingElement.innerHTML = desc;
}

function setTextContent(parentElement, classHeading, content) {
    const headingElement = parentElement.querySelector(classHeading);
    if (!headingElement) return;
    
    headingElement.textContent = content;
 
}

function setUrlImg(parentElement, classImg, url, index) {
    if (!parentElement) return;
    const imgElement = parentElement.querySelector(classImg);
    if (!imgElement) return;
    imgElement.src = url;
}

function setTextContentFeature(modalElement, featureList) {
    const contentElement = modalElement.querySelector('.content');
    featureList.forEach(feature => {
        
    const pElement = document.createElement('p');
    pElement.innerHTML=feature;
    contentElement.appendChild(pElement);
    });


}

function setImgList(modalElement, classImages , product) {
    if (!product) return;
    const imgListElement = modalElement.querySelector(classImages);
    imgListElement.setAttribute('data-id', 0);
    product.images.forEach(img => {
    const imgElement = document.createElement('img');
    imgElement.setAttribute("src", img);
    imgListElement.appendChild(imgElement);
    });


}
function surfImg(classImagesElement, idx) {
   const imagesElement = document.querySelector(classImagesElement);
    const width = imagesElement.getBoundingClientRect().width;
    imagesElement.style.transform = 'translateX(-' + idx * width + 'px)';

}

function eventPrevButton(modalElement, imgList) {
    const prevButton = modalElement.querySelector('.prev');
    
    if(prevButton) {
        const imagesElement = modalElement.querySelector('.modal-images')
        prevButton.addEventListener('click',()=> {
            const currentIdx = +imagesElement.getAttribute('data-id');
            if(currentIdx <= 0) {
                return;
            }
            const nextIdx = currentIdx -1;
            surfImg('.modal-images', nextIdx);
            imagesElement.setAttribute('data-id', nextIdx);
            if(nextIdx === 0) {
                prevButton.style.display = "none"; 
            } 
            if(currentIdx !== 0) {
                const nextButton = modalElement.querySelector('.next');
                nextButton.style.display = "block"; 
            } 
        })
    }
}

function eventNextButton(modalElement, imgList) {
    const nextButton = modalElement.querySelector('.next');
    if(nextButton) {
        const imagesElement = modalElement.querySelector('.modal-images')
        nextButton.addEventListener('click',()=> {
            const currentIdx = +imagesElement.getAttribute('data-id');

            if(currentIdx >= imgList.length-1) {
                return;
            }

            const nextIdx = currentIdx +1;
            surfImg('.modal-images', nextIdx);

            imagesElement.setAttribute('data-id', nextIdx);
            if(nextIdx === imgList.length-1) {
                nextButton.style.display = "none"; 
            }
            if(currentIdx !== imgList.length-1) {
                const prevButton = modalElement.querySelector('.prev');
                prevButton.style.display = "block"; 
            }
            
            
        })
    }
}

function renderFilteringProcess(modalElement) {
    const processElement = modalElement.querySelector('.process');
    if(!processElement) return;
    const steps = modalElement.querySelector('.steps');
    const filteringProcess = currentLang === "vi" ? [...viFilteringProcess] : [...enFilteringProcess];
    // const array = [...filteringProcess];
    filteringProcess.forEach(value => {
    const pElement = document.createElement('li');
        pElement.textContent = value;
        steps.appendChild(pElement);
    });

}

function createModalElement(product) {
    const divElement = document.createElement('div');
    divElement.innerHTML = modalString;
    const modalElement = divElement.firstElementChild;
    // --------------------
     const translations = currentLang === "vi" ? viTranslations : enTranslations;

  modalElement.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (translations[key]) {
      element.textContent = translations[key];
    }
  });





    // ------------



    modalElement.setAttribute('data-product-id', product.id);
    
    // Set product name and description
    setTextContent(modalElement, '.product-name', product.productName);
    setTextContent(modalElement, '.desc', product.desc);
    
    // Set images
    setImgList(modalElement, '.modal-images', product);
    
    // Set specifications
    setTextContent(modalElement, '.weight', product.specifications.weight);
    setTextContent(modalElement, '.size', product.specifications.size);
    setTextContent(modalElement, '.door', product.specifications.door);
    setTextContent(modalElement, '.capacity', product.specifications.capacity);
    setTextContent(modalElement, '.customer-tank-capacity', product.specifications.customerTankCapacity);
    setTextContent(modalElement, '.operating-temperature', product.specifications.operatingTemperature);
    setTextContent(modalElement, '.voltage', product.specifications.voltage);
    setTextContent(modalElement, '.power-consumption', product.specifications.powerConsumption);
    setTextContent(modalElement, '.water-filtration-rate', product.specifications.waterFiltrationRate);
    setTextContent(modalElement, '.water-supply-rate', product.specifications.waterSupplyRate);
    
    // Set features
    setTextContentFeature(modalElement, product.feature);
    
    // Add event listeners
    eventPrevButton(modalElement, product.images);
    eventNextButton(modalElement, product.images);
    
    // Render filtering process
    renderFilteringProcess(modalElement);
    
    return modalElement;
}



function triggerShowModal(parentElement, classButton, product) {
    if (!parentElement) return;
    const modalElement = document.querySelector('.modal');
    if (!modalElement) return;
    const buttonElement = parentElement.querySelector(classButton);
    if (!buttonElement) return;
    buttonElement.setAttribute("data-id", product.id);
    buttonElement.addEventListener("click", () => {
        modalElement.textContent = "";
        const model = createModalElement(product);
        modalElement.appendChild(model);
        modalElement.style.display = "block";
    });
}



function createProductElement(product, index) {
    const divElement = document.createElement('div');
    divElement.innerHTML = productString;
    const productElement = divElement.firstElementChild;
    if (index % 2 !== 0) {
        productElement.classList.add('product-reverse');
    }
    setUrlImg(productElement, '.product-img-1', product.images[0], index);
    setTextContent(productElement, '.heading', product.productName);
    setTextContentDesc(productElement, '.desc', product.feature);
    triggerShowModal(productElement, '.btn', product);
    return productElement;
}


function renderProducts(productList) {
    const productListElement = document.getElementById('product-list');
    if (!productListElement) return;
    productList.forEach((product, index) => {
        const productElement = createProductElement(product, index);
        if (!productElement) return;
        productListElement.appendChild(productElement);
    });

}


function changeDot(dotsElement, dotElement, dotListElement) {
            dotListElement.forEach((dot, index) => {
                if (+dot.getAttribute("data-id") !== +dotElement.getAttribute("data-id")) {
                    dot.classList.remove("active");
                } else {
                    dot.classList.add("active");
                }
});
            dotsElement.setAttribute("data-id", dotElement.getAttribute("data-id"));

}

function surfAuto() {
    const dotsElement = document.querySelector('.dots');
    if (!dotsElement) return;
    const dotListElement = dotsElement.querySelectorAll('.dot');
    if (!dotListElement) {
        return;
    }
    let intervalId = setInterval(function() {
        const feedbackParentElement = document.querySelector('.feedback-list');
        if(feedbackParentElement.getAttribute("data-direction") === 'ltr'){

            const currentId = +feedbackParentElement.getAttribute("data-id");
                const nextId = currentId +1;
                surfFeedBack('.feedback-list',nextId);
                changeDot(dotsElement, dotListElement[nextId], dotListElement );
                
            if(nextId === dotListElement.length-1) {
                feedbackParentElement.setAttribute("data-direction", 'rtl') ;
            }
        } else {
            const currentId = +feedbackParentElement.getAttribute("data-id");
                    const nextId = currentId -1;
                    surfFeedBack('.feedback-list',nextId);
                    changeDot(dotsElement, dotListElement[nextId], dotListElement);
        
            if(nextId <= 0) {
                feedbackParentElement.setAttribute("data-direction", 'ltr') ;
            }
        }
        
      }, 4500);

}


function surfFeedBack(classElement, i) {
    const feedbacksElement = document.querySelector(classElement);
    if (!feedbacksElement) return;
    
    const width = feedbacksElement.getBoundingClientRect().width;
    
    if(i > 0) {
        feedbacksElement.style.transform = 'translateX(-' + i * width + 'px)';

    } else {
        feedbacksElement.style.transform = 'translateX(' + i * width + 'px)';
    }
    feedbacksElement.setAttribute("data-id", i);

}


 function eventListenerForDot() {
    const dotsElement = document.querySelector('.dots');
    if (!dotsElement) return;
    const dotListElement = dotsElement.querySelectorAll('.dot');
    if (!dotListElement) {
        return;
    }
    const feedbackParentElement = document.querySelector('.feedback-list');
    if(!feedbackParentElement)return;

    dotListElement.forEach((dotElement, index) => {
        dotElement.addEventListener("click", () => {
            const newIdx = +dotElement.getAttribute("data-id");
            if (newIdx === +dotsElement.getAttribute("data-id")) return;

            changeDot(dotsElement, dotListElement[newIdx], dotListElement);
            if(newIdx === 0) {
                feedbackParentElement.setAttribute("data-direction", 'ltr') ;
            } 
            if(newIdx === dotListElement.length-1) {
                feedbackParentElement.setAttribute("data-direction", 'rtl') ;
            }          
            surfFeedBack('.feedback-list',newIdx);  
        });
    });

}

function eventCloseModal() {
   const modalElement =  document.querySelector('.modal');
   if(modalElement) {
    modalElement.addEventListener('click',  (e) =>{
        if(e.target.classList.contains("icon-close") || e.target.classList.contains("close") || e.target.className === "modal") {
            modalElement.style.display ="none";
        } else {
            e.stopPropagation();
        }
       })
   }
}

// Thêm hàm để cập nhật modal khi ngôn ngữ thay đổi
function updateModalContent(product) {
    const modalElement = document.querySelector('.modal .body');
    if (!modalElement) return;

    // Cập nhật tên và mô tả sản phẩm
    setTextContent(modalElement, '.product-name', product.productName);
    setTextContent(modalElement, '.desc', product.desc);

    // Cập nhật các thông số kỹ thuật
    setTextContent(modalElement, '.weight', product.specifications.weight);
    setTextContent(modalElement, '.size', product.specifications.size);
    setTextContent(modalElement, '.door', product.specifications.door);
    setTextContent(modalElement, '.capacity', product.specifications.capacity);
    setTextContent(modalElement, '.customer-tank-capacity', product.specifications.customerTankCapacity);
    setTextContent(modalElement, '.operating-temperature', product.specifications.operatingTemperature);
    setTextContent(modalElement, '.voltage', product.specifications.voltage);
    setTextContent(modalElement, '.power-consumption', product.specifications.powerConsumption);
    setTextContent(modalElement, '.water-filtration-rate', product.specifications.waterFiltrationRate);
    setTextContent(modalElement, '.water-supply-rate', product.specifications.waterSupplyRate);

    // Cập nhật các tính năng
    const contentElement = modalElement.querySelector('.content');
    if (contentElement) {
        // Xóa các tính năng cũ
        const oldFeatures = contentElement.querySelectorAll('p');
        oldFeatures.forEach(feature => feature.remove());
        
        // Thêm các tính năng mới
        product.feature.forEach(feature => {
            const pElement = document.createElement('p');
            pElement.innerHTML = feature;
            contentElement.appendChild(pElement);
        });
    }

    // Cập nhật quy trình lọc
    const processElement = modalElement.querySelector('.process');
    if (processElement) {
        const steps = processElement.querySelector('.steps');
        if (steps) {
            steps.innerHTML = ''; // Xóa các bước cũ
            const filteringProcess = currentLang === "vi" ? [...viFilteringProcess] : [...enFilteringProcess];
            filteringProcess.forEach(value => {
                const liElement = document.createElement('li');
                liElement.textContent = value;
                steps.appendChild(liElement);
            });
        }
    }
}

// Thêm hàm để render lại danh sách sản phẩm
function reRenderProducts() {
    const productListElement = document.getElementById('product-list');
    if (!productListElement) return;
    
    // Xóa danh sách sản phẩm cũ
    productListElement.innerHTML = '';
    
    // Lấy danh sách sản phẩm theo ngôn ngữ hiện tại
    const productList = currentLang === "vi" ? [...viProducts] : [...enProducts];
    console.log('Current language:', currentLang);
    console.log('Product list:', productList);
    
    // Render lại danh sách sản phẩm
    productList.forEach((product, index) => {
        const productElement = createProductElement(product, index);
        if (!productElement) return;
        productListElement.appendChild(productElement);
    });
}

// Thêm event listener cho việc thay đổi ngôn ngữ
document.addEventListener('languageChanged', (event) => {
    // Cập nhật ngôn ngữ hiện tại
    currentLang = localStorage.getItem("language") || "vi";
    console.log('Language changed to:', currentLang);
    
    // Cập nhật modal nếu đang mở
    // const modalElement = document.querySelector('.modal');
    // if (modalElement && modalElement.style.display === 'block') {
    //     const productId = document.querySelector('.modal .body').getAttribute('data-product-id');
    //     const productList = currentLang === "vi" ? [...viProducts] : [...enProducts];
    //     const currentProduct = productList.find(p => p.id === parseInt(productId));
    //     if (currentProduct) {
    //         updateModalContent(currentProduct);
    //     }
    // }
    
    // Render lại danh sách sản phẩm
    reRenderProducts();
});

(() => {
    // Render sản phẩm ban đầu
    surfAuto();
    eventListenerForDot();
    eventCloseModal();
    reRenderProducts();

})();