# To start the app

git clone git@github.com:Rule2k/foobartory.git
yarn && yarn start
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Testing

yarn test

# Results

When opening the app, you should see 3 importants things, two robots (red by default), a disabled button, and a summary bar

- The robots can be clicked to be assigned to a specific job. On click, a popup will appear to be able to select a new job. By default, they are idle and aren't doing anything, but if you select another job, they'll switch to it and after a 5 seconds delay, they'll start their new job. They are assigned specific color depending on their status: Red while Idle, orange when switching, and green when working.

- Create a new robot is a button to create a new robot. This button is only available when the requierement of building a new robot are matched.

- The summary at the botton of the page is here to inform the users of the current stack of foo, bar, foobar and robots.
