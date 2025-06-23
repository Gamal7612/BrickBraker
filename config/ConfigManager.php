<?php
class ConfigManager
{
    private array $config = [];

    public function __construct()
    {
        
    }
    public function load(string $file): void
    {
        if (file_exists($file)) 
        {
            $this->config = include $file; //charge le tableau de config.php dans $config
        } else 
        {
            throw new Exception("Fichier de config introuvable.");  
        }
    }
    public function get(string $key, mixed $default = null): mixed //mixed => cela veut dire que l'on accepte tout type de données
    {
        $keys = explode('.', $key);
        $value = $this->config;
        foreach ($keys as $k) 
        {
            if (isset($value[$k])) 
            {
                $value = $value[$k];
            } else 
            {
                return $default;
            }
        }
        return $value;
    }
}