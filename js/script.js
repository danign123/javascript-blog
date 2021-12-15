'use strict';

function titleClickHandler(event){

  event.preventDefault();

  const clickedElement = this;
  console.log('Link was clicked!', event);

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){

    activeLink.classList.remove('active');

  }

  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  const activeArticles = document.querySelectorAll('.active');

  for(let activeArticle of activeArticles){

    activeArticle.classList.remove('active');

  }

  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector', articleSelector);

  const targetArticle = document.querySelector(articleSelector);
  
  targetArticle.classList.add('active');
  console.log('targetArticle', targetArticle);

}

/*

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

*/

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors';
  //optCloudClassCountAuthor = '5',
  //optCloudClassPrefixAuthor = 'author-size-';
  //optTagsListSelector = '.tags.list';



function generateTitleLinks(customSelector = '') {       

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log(titleList);
  
  const articles = document.querySelectorAll(optArticleSelector + customSelector);     
  
  let html = '';

  for(let article of articles){

    const articleId = article.getAttribute('id');

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('linkHTML', linkHTML);

    html = html + linkHTML;
  
  }
  
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();


function calculateTagsParams(tags) {

  const params = {max: 0, min: 999999};

  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }

  return params;
}


function calculateTagClass(count, params){

  const normalizedCount = count - params.min;

  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );


  return optCloudClassPrefix + classNumber;

}


function generateTags(){

  let allTags = {};

  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){

    const titleList = article.querySelector(optArticleTagsSelector);

    let html = '';

    const articleTags = article.getAttribute('data-tags');

    console.log('articleTags', articleTags);

    const articleTagsArray = articleTags.split(' ');

    for(let tag of articleTagsArray){

      const tagLinkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li> ';
      
      html = html + tagLinkHTML;

      if(!allTags.hasOwnProperty(tag)){
    
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

    
    }

    titleList.innerHTML = html;

  }

  const tagList = document.querySelector('.tags');

  const tagsParams = calculateTagsParams(allTags);

  console.log('tagsParams:', tagsParams);

  let allTagsHTML = '';

  for(let tag in allTags){

    //allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + '</a>' + ' (' + allTags[tag] + ')</li> ';
    
    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';

    allTagsHTML += tagLinkHTML;

    console.log('taglinkHTML:', tagLinkHTML);
  }

  tagList.innerHTML = allTagsHTML;

}

generateTags();


function tagClickHandler(event){

  event.preventDefault();

  const clickedElement = this;
  console.log('clicked tag');

  const href = clickedElement.getAttribute('href');


  const tag = href.replace('#tag-', '');


  const activeTags  = document.querySelectorAll('a.active[href^="#tag-"]');

  for(let activeTag of activeTags) {

    activeTag.classList.remove('active');

  }

  const tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');

  for(let tagLinkHref of tagLinksHref){

    tagLinkHref.classList.add('active');

  }

  generateTitleLinks('[data-tags~="' + tag + '"]');

}




function addClickListenersToTags(){

  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');
  console.log(allLinksToTags);

  for(let link of allLinksToTags){

    link.addEventListener('click', tagClickHandler);

  }

  
}

addClickListenersToTags();






function calculateAuthorParams(authors) {

  const authorParams = {max: 0, min: 999999};

  for(let author in authors){
    console.log(author + ' is used ' + authors[author] + ' times');
    if(authors[author] > authorParams.max){
      authorParams.max = authors[author];
    }
    if(authors[author] < authorParams.min){
      authorParams.min = authors[author];
    }
  }

  return authorParams;
}


/*
function calculateAuthorClass(countAuthor, authorParams){

  const normalizedCount = countAuthor - authorParams.min;

  const normalizedMax = authorParams.max - authorParams.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor (percentage * (optCloudClassCountAuthor - 1) + 1 );


  return optCloudClassPrefixAuthor + classNumber;

}
*/




function generateAuthors(){

  //NEW
  let allAuthors = {};

  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){

    const titleList = article.querySelector(optArticleAuthorSelector);

    let html = '';

    const authorTags = article.getAttribute('data-author');

    const authorLinkHTML = '<li><a href="#author-' + authorTags + '"><span>' + authorTags + '</span></a></li>';
      
    html = html + authorLinkHTML;

    //NEW
    if(!allAuthors.hasOwnProperty[authorTags]){

      allAuthors[authorTags] = 1;

    } else {

      allAuthors[authorTags]++;

    }

    titleList.innerHTML = html;

  }

  const authorsList = document.querySelector(optAuthorsListSelector);

  const authorParams = calculateAuthorParams(allAuthors);
  console.log('authorParams', authorParams);

  let allAuthorsHTML = '';

  for(let author in allAuthors){

    //const authorLinkHTML = '<li><a class="' + calculateAuthorClass(allAuthors[author], authorParams) + '" href="#author-' + author + '">' + author + '</a></li>';

    const authorLinkHTML = '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] +') ' + '</a></li> ';

    allAuthorsHTML += authorLinkHTML;
    console.log('authorLinkHTML:', authorLinkHTML);

  }

  authorsList.innerHTML = allAuthorsHTML;

}

generateAuthors();












function authorClickHandler(event){

  event.preventDefault();

  const clickedElement = this;
  
  const href = clickedElement.getAttribute('href');

  const tag = href.replace('#author-', '');

  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  for(let authorLink of authorLinks) {

    authorLink.classList.remove('active');

  }

  const authorLinksHref = document.querySelectorAll('a[href="' + href + '"]');

  for(let authorLinkHref of authorLinksHref){

    authorLinkHref.classList.add('active');

  }

  generateTitleLinks('[data-author="' + tag + '"]');

}






function addClickListenersToAuthors(){

  const allLinksToAuthors = document.querySelectorAll('a[href^="#author-"]');

  for(let link of allLinksToAuthors){

    link.addEventListener('click', authorClickHandler);

  }

  
}

addClickListenersToAuthors();
  



