'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!', event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector', articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  

  /* [DONE] add class 'active' to the correct article */

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
  optArticleAuthorSelector = '.post-author';
  //optTagsListSelector = '.tags.list';

function generateTitleLinks(customSelector = ''){       //pytanie do mentora

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log(titleList);
  
  /* [DONE] for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);     //pytanie do mentora
  
  let html = '';

  for(let article of articles){

    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');

    /* [DONE] find the title element */ /* [DONE] get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('linkHTML', linkHTML);

    /* [DONE] insert link into titleList */

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


function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */

  let allTags = [];

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for(let article of articles){

    /* find tags wrapper */

    const titleList = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log('articleTags', articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */

    for(let tag of articleTagsArray){

      /* generate HTML of the link */

      const tagLinkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      
      /* add generated code to html variable */

      html = html + tagLinkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(allTags.indexOf(tagLinkHTML) == -1){
        /* [NEW] add generated code to allTags array */
        allTags.push(tagLinkHTML);
      }

      /* END LOOP: for each tag */
    
    }

    /* insert HTML of all the links into the tags wrapper */

    titleList.innerHTML = html;

    /* END LOOP: for every article: */

  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTags.join(' ');

}

generateTags();


function tagClickHandler(event){
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;
  console.log('clicked tag');

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */

  const activeTags  = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */ /* remove class active */ /* END LOOP: for each active tag link */

  for(let activeTag of activeTags) {

    activeTag.classList.remove('active');

  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */ /* add class active */ /* END LOOP: for each found tag link */

  for(let tagLinkHref of tagLinksHref){

    tagLinkHref.classList.add('active');

  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){
  /* find all links to tags */

  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');
  console.log(allLinksToTags);

  /* START LOOP: for each link */ /* add tagClickHandler as event listener for that link */ /* END LOOP: for each link */

  for(let link of allLinksToTags){

    link.addEventListener('click', tagClickHandler);

  }

  
}

addClickListenersToTags();



function generateAuthors(){

  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){

    const titleList = article.querySelector(optArticleAuthorSelector);

    let html = '';

    const authorTags = article.getAttribute('data-author');

    const authorLinkHTML = '<li><a href="#author-' + authorTags + '"><span>' + authorTags + '</span></a></li>';
      
    html = html + authorLinkHTML;

    titleList.innerHTML = html;

  }

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
  



