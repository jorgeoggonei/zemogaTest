# Zemoga UI Test - Jorge Enrique Santos Oggonei

Hello. This is my test to apply as a front End developer in Zemoga

## Installation

To run the project please download this repo

```bash
git clone https://github.com/jorgeoggonei/zemogaTest.git
```

Once you've donloaded it, install the project dependencies. In the root folder run

```bash
npm install
```

## What you'll find in the project

The project was made in React.
The original HTML and CSS files were refactored. Some component were created for this refactor in the folter **src/components/content**:

- Alert
- Banner
- Footer
- Header

for styling, a **styles** folter was created where you can see some global styles for the project:

- mixins
- variables
- global
- main

The main JSON file can be found in **src/data/data.json**

## How the project works

When the page loads, it will check if localStorage has **rulings** key. If it exists, the application will use that information. Otherwise, the json file will be loaded and added to the localstorage.
