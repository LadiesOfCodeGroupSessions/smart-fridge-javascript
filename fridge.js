class Fridge {
	itemCount = 0;
	items = [];
	fridgeDoorOpened = false;
	expiredItemsArray = [];
	inDateItemsArray = [];
	formattedDisplayArray = [];

	signalDoorOpened() {
		this.fridgeDoorOpened = true;
		this.reduceItemExpiry();
		return this.fridgeDoorOpened;
	}

	signalDoorClosed() {
		this.fridgeDoorOpened = false;
		return this.fridgeDoorOpened;
	}

	scanAddedItem(item) {
		this.itemCount++;
		item.scannedTime = this.setCurrentDate();
		this.items.push(item);
	}

	isItemInFridge(item) {
		return this.items.includes(item);
	}

	getItemCount() {
		return this.itemCount;
	}

	setCurrentDate() {
		const currentTime = new Date().toLocaleDateString("en-GB");
		return currentTime;
	}

	removeItemFromFridge(item) {
		if (this.isItemInFridge(item)) {
			this.itemCount--;
		}
		return "item not in fridge";
	}

	reduceItemExpiry() {
		for (let i = 0; i < this.items.length; i++) {
			switch (this.items[i].condition) {
				case "sealed":
					this.items[i].expiry.setHours(this.items[i].expiry.getHours() - 1);
					break;
				case "opened":
					this.items[i].expiry.setHours(this.items[i].expiry.getHours() - 5);
					break;
			}
		}
	}

	expiredOrNot() {
		for (let i = 0; i < this.items.length; i++) {
			if (this.items[i].expiry < new Date()) {
				this.expiredItemsArray.push(this.items[i].name);
			} else {
				this.inDateItemsArray.push(this.items[i]);
			}
		}

		this.inDateItemsArray.sort((a, b) => (a.expiry > b.expiry ? 1 : -1));

		for (let i = 0; i < this.inDateItemsArray.length; i++) {
			this.formattedDisplayArray.push(
				this.inDateItemsArray[i].name +
					": " +
					this.inDateItemsArray[i].daysLeftToEat +
					" days remaining"
			);
		}
	}

	displayItems() {
		return (
			"EXPIRED: " +
			this.expiredItemsArray.join("\r\nEXPIRED: ") +
			"\r\n" +
			this.formattedDisplayArray.join("\r\n")
		);
	}

	simulateDayOver() {
		for (let i = 0; i < this.items.length; i++) {
			this.items[i].expiry.setHours(this.items[i].expiry.getHours() - 24);
		}
	}
}

module.exports = Fridge;
