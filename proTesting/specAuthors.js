describe('Author Preview Page', () => {
	it('should nav to the author preview page', function() {
		browser.get('http:\\localhost:4200');
		navigateToAuthorsPage();
	});
	
	function navigateToAuthorsPage(){
	  	actualUrl = 'http://localhost:4200/#/authors';
	    element(by.id('authors-nav')).click().then(function(){ // first find list-home a tag and than click 
	        browser.sleep(2000).then(function(){
	          browser.getCurrentUrl().then(function(actualUrl){ // promise
	            expect(actualUrl.indexOf('authors') !== -1).toBeTruthy(); // check the current url is list
	          });
	        });

	    });
	  }
});

describe('Authors Detailed Page', () => {
    it('should nav to authors detail page', function () {
        browser.get('http://localhost:4200/#/authors');
        navigateToAuthorDetailedPage();
    });

    function navigateToAuthorDetailedPage() {
        actualUrl = 'http://localhost:4200/#/author';
        const issuesList = element.all(by.id('authors-row'));
        const issuesCount = issuesList.count();
        for (var i = 0; i < issuesCount; i++) {
            element(by.id(issuesList[i])).click().then(function () {
                browser.sleep(2000).then(function () {
                    browser.getCurrentUrl().then(function (actualUrl) { // promise
                        expect(browser.getCurrentUrl()).toEqual(actualUrl);
                    });
                });
            });
        }
    }
});

describe('Preview Page Forward and Backward', () => {
    it('should nav to next page and test new authors', function () {
        browser.get('http://localhost:4200/#/authors');
        forwardToNextAuthors();
    });

    it('should nav to previous page and test older authors', function () {
        browser.get('http://localhost:4200/#/authors');
        backwardToPreviousAuthors();
    });

    function forwardToNextAuthors() {
        element(by.id('authors-fwdbutton')).click().then(function () {
            const issuesList = element.all(by.id('authors-row'));
            const issuesCount = issuesList.count();
            for (var i = 0; i < issuesCount; i++) {
                s = element(by.id('authors-name')).getText();
                element(by.id('authors-row')).click().then(function () {
                    t = element(by.id('authors-header-name')).getText();
                    expect(s).toEqual(t);
                });
            }
        });
    };

    function backwardToPreviousAuthors() {
        element(by.id('authors-fwdbutton')).click().then(function () {
            element(by.id('authors-backbutton')).click().then(function () {
                const issuesList = element.all(by.id('authors-row'));
                const issuesCount = issuesList.count();
                for (var i = 0; i < issuesCount; i++) {
                    s = element(by.id('authors-name')).getText();
                    element(by.id('authors-row')).click().then(function () {
                        t = element(by.id('authors-header-name')).getText();
                        expect(s).toEqual(t);
                    });
                }
            });
        });
    };
});

describe('Detail Page Expansion', () => {
	it('should open all tabs', function() {
		browser.get('http://localhost:4200/#/authors');
	    openAllTabs();
    })
    
    it('should close all tabs', function() {
		browser.get('http://localhost:4200/#/authors');
	    closeAllTabs();
    })

	
	function openAllTabs() {
		b = false;
	    browser.sleep(2000).then(function(){
			element(by.id('authors-row')).click().then(function(){
				element(by.id('authors-openAll')).click().then(function() {
					if(element(by.id('author-char-desc')).isDisplayed() && 
							   element(by.id('author-info-desc')).isDisplayed() && 
							   element(by.id('author-issue-desc')).isDisplayed() &&
							   element(by.id('author-desc-desc')).isDisplayed()) {
								   b = true;
							   }
							   else {
								   b = false;
							   }
					//expect(element.all(by.css('mat-expansion-panel'))).isPresent().toBeTruthy();
					expect(b).toBe(true);//.toBe(false);
					
				})
			})
	    })
    }
    
    function closeAllTabs() {
		bb = true;
	    browser.sleep(2000).then(function(){
			element(by.id('authors-row')).click().then(function(){
				element(by.id('authors-openAll')).click().then(function() {
				    browser.sleep(2000).then(function(){
	                    element(by.id('authors-closeAll')).click().then(function() {
	                    	if(element(by.id('author-char-desc')).isDisplayed() && 
	 							   element(by.id('author-info-desc')).isDisplayed() && 
	 							   element(by.id('author-issue-desc')).isDisplayed() &&
	 							   element(by.id('author-desc-desc')).isDisplayed()) {
	 								   bb = false;
	 							   }
	 							   else {
	 								   bb = true;
	 							   }
						//expect(element.all(by.css('mat-expansion-panel'))).isPresent().toBeTruthy();
						expect(bb).toBe(false);//.toBe(false);
	                })
				})
			})
	    })
     })
    }
})

describe('Detail Page Expansion One by One', () => {
	it('should open the Characters Tab', function() {
		browser.get('http://localhost:4200/#/authors');
	    openCharactersTab();
    })
    
    it('should open the Info Tab', function() {
		browser.get('http://localhost:4200/#/authors');
	    openInfoTab();
    })
    
	it('should open the Description Tab', function() {
		browser.get('http://localhost:4200/#/authors');
	    openDescriptionTab();
    })

    it('should open the Issues Tab', function() {
		browser.get('http://localhost:4200/#/authors');
	    openIssuesTab();
    })
    	
	function openDescriptionTab() {
	    browser.sleep(2000).then(function(){
			element(by.id('authors-row')).click().then(function(){
				element(by.id('author-Description-expand')).click().then(function() {
					expect(element(by.id('author-desc-desc')).isDisplayed()).toBe(true);//.toBe(false);
					
				})
			})
	    })
    }
    
    function openCharactersTab() {
	    browser.sleep(2000).then(function(){
			element(by.id('authors-row')).click().then(function(){
				element(by.id('author-Characters-expand')).click().then(function() {
					expect(element(by.id('author-char-desc')).isDisplayed()).toBe(true);
	            })
            })
        })
    }

    function openIssuesTab() {
	    browser.sleep(2000).then(function(){
			element(by.id('authors-row')).click().then(function(){
				element(by.id('author-Issues-expand')).click().then(function() {
					expect(element(by.id('author-issue-desc')).isDisplayed()).toBe(true);
	            })
            })
        })
    }
    
    function openInfoTab() {
    	browser.sleep(2000).then(function(){
			element(by.id('authors-row')).click().then(function(){
				element(by.id('author-info-expand')).click().then(function() {
					expect(element(by.id('author-info-desc')).isDisplayed()).toBe(true);
	            })
            })
        })
    }
})

describe('Detail Page Linkage', () => {
	it('should link to character page', function() {
		browser.get('http://localhost:4200/#/authors');
	    linkCharacters();
    })
	
	function linkCharacters() {
		b = false;
		actualUrl = 'http://localhost:4200/#/character';
	    browser.sleep(2000).then(function(){
			element(by.id('authors-row')).click().then(function(){
				element(by.id('author-Characters-expand')).click().then(function() {
					element(by.id('author-Characters-description')).click().then(function() {
						var EC = protractor.ExpectedConditions;
						// Waits for an alert pops up.
						if (EC.alertIsPresent() || browser.getCurrentUrl()===actualUrl) {
							b = true;
						} else {
							b = false;
						}
					//expect(element.all(by.css('mat-expansion-panel'))).isPresent().toBeTruthy();
					expect(b).toBe(true);//.toBe(false);
					})
				})
			})
	    })
    }
})

describe('Detail Page Linkage', () => {
	it('should link to issue page', function() {
		browser.get('http://localhost:4200/#/authors');
	    linkIssues();
    })
	
	function linkIssues() {
		b = false;
		actualUrl = 'http://localhost:4200/#/issue';
	    browser.sleep(2000).then(function(){
			element(by.id('authors-row')).click().then(function(){
				element(by.id('author-Issues-expand')).click().then(function() {
					element(by.id('author-Issues-description')).click().then(function() {
						var EC = protractor.ExpectedConditions;
						// Waits for an alert pops up.
						if (EC.alertIsPresent() || browser.getCurrentUrl()===actualUrl) {
							b = true;
						} else {
							b = false;
						}
					//expect(element.all(by.css('mat-expansion-panel'))).isPresent().toBeTruthy();
					expect(b).toBe(true);//.toBe(false);
					})
				})
			})
	    })
    }
})

describe('Authors Page can Search', () => {
	it('should show search page', function() {
		browser.get('http://localhost:4200/#/authors');
		linkSearch();
	})
	
	function linkSearch() {
		element(by.id('search-input')).sendKeys('man').then(function() {
			element(by.id('search-button')).click().then(function() {
				browser.getCurrentUrl().then(function(actualUrl){ // promise
		            expect(actualUrl.indexOf('search-page') !== -1).toBeTruthy();
				})
			})
		});
	}
})

describe('Author Detail Page can Search', () => {
	it('should show search page', function() {
		browser.get('http://localhost:4200/#/author');
		linkSearch();
	})
	
	function linkSearch() {
		element(by.id('search-input')).sendKeys('iron').then(function() {
			element(by.id('search-button')).click().then(function() {
				browser.getCurrentUrl().then(function(actualUrl){ // promise
		            expect(actualUrl.indexOf('search-page') !== -1).toBeTruthy();
				})
			})
		});
	}
})

describe('Authors Page can filter', () => {
	it('should show filter results', function() {
		browser.get('http://localhost:4200/#/authors');
		linkFilter();
	})
	
	function linkFilter() {
		element(by.id('filter-input')).sendKeys('iron').then(function() {
			element(by.id('filter-button')).click().then(function() {
				expect(element(by.id('characterinfo')) !== null).toBeTruthy();
			})
		});
	}
})

describe('Authors Page can filter', () => {
	it('should hide filter results', function() {
		browser.get('http://localhost:4200/#/authors');
		hideFilter();
	})
	
	function hideFilter() {
		element(by.id('filter-input')).sendKeys('iron').then(function() {
			element(by.id('filter-button')).click().then(function() {
				element(by.id('hide-button')).click().then(function() {
					expect(element(by.id('hide-button')).isDisplayed()).tobe(false);
				})
			})
		});
	}
})

describe('Authors Page can sort', () => {
	it('should sort acendingly', function() {
		browser.get('http://localhost:4200/#/authors');
		sortAscending();
		sortDecending();
	})
	
	function sortAscending() {
		element(by.id('chars-sortAZ-button')).click().then(function() {
			expect(element(by.id('characterinfo')).getText().indexOf('A') !== -1).tobe(true);
		});
	}
	
	function sortDecending() {
		element(by.id('chars-sortZA-button')).click().then(function() {
			expect(element(by.id('characterinfo')).getText().indexOf('T') !== -1).tobe(true);
		});
	}	
})