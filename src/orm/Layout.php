<?php

class Layout extends \Tina4\ORM
{
    /**
     * @var integer default 0 not null
     */
    public $id;
    /**
     * @var varchar(255) default 'default' not null
     */
    public $name;
    /**
     * @var integer default 1 not null references site(id) on update cascade on delete cascade
     */
    public $siteId;
    /**
     * @var timestamp default CURRENT_TIMESTAMP not null
     */
    public $dateCreated;
    /**
     * @var timestamp default null
     */
    public $dateModified;
    /**
     * @var varchar(20) default 'page' not null
     */
    public $layoutType;

    /**
     * @var blob default null
     */
    public $pageLayout;

    /**
     * @var blob default null
     */
    public $pageLayoutHTML;
}